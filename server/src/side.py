import cv2
import mediapipe as mp
import time
import sys
from picamera2 import Picamera2
from playsound import playsound

playsound("voice/side_start.mp3")
print("loading", flush=True)


# 초기화
mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(
    model_complexity=1, min_detection_confidence=0.5, min_tracking_confidence=0.7
)


# Picamera2 시작
picam2 = Picamera2()
picam2.start_preview()

# 카메라 설정
camera_config = picam2.create_preview_configuration(main={"size": (1280, 720)})
picam2.configure(camera_config)
picam2.start()

frame_width, frame_height = picam2.sensor_resolution


# 운동 횟수 초기화
right_side_exercise_count = 0
left_side_exercise_count = 0

# 운동 시작과 완료를 위한 상태 변수
right_exercise_started = False
left_exercise_started = False
right_start_time = 0
left_start_time = 0
start_time = time.time()  # 프로그램 시작 시간

# 움직임 감지를 위한 임곗값 설정
shoulder_movement_threshold = 0.1  # 어깨가 이동해야 하는 최소 임곗값


camera_started_flag = False  # 카메라 시작 플래그 초기화

while True:
    # Picamera2로부터 이미지 프레임 받아오기
    image = picam2.capture_array()
    if image is None:
        print("Error receiving frame from Picamera2.", flush=True)
        break

    if not camera_started_flag:  # 카메라 시작 플래그를 체크합니다.
        print("Camera started", flush=True)  # 카메라가 시작되면 이 메시지를 출력합니다.
        sys.stdout.flush()
        camera_started_flag = True  # 플래그를 설정하여 메시지가 다시 출력되지 않도록 합니다.

    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = pose.process(image_rgb)
    image_bgr = cv2.cvtColor(image_rgb, cv2.COLOR_BGR2RGB)

    # 포즈 감지를 위한 조건 설정
    if results.pose_landmarks:
        landmarks = results.pose_landmarks.landmark

        # 관절 좌표 가져오기
        right_wrist = landmarks[mp_pose.PoseLandmark.RIGHT_WRIST]
        right_eye = landmarks[mp_pose.PoseLandmark.RIGHT_EYE]
        right_shoulder = landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER]
        left_shoulder = landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER]
        left_wrist = landmarks[mp_pose.PoseLandmark.LEFT_WRIST]
        left_eye = landmarks[mp_pose.PoseLandmark.LEFT_EYE]

        # 운동 시작 조건 체크
        if not right_exercise_started:
            if right_wrist.y < right_eye.y and right_wrist.x > right_eye.x:
                right_exercise_started = True
                right_start_time = time.time()

        if not left_exercise_started:
            if left_wrist.y < left_eye.y and left_wrist.x < left_eye.x:
                left_exercise_started = True
                left_start_time = time.time()

        # 운동 완료 조건 체크
        if right_exercise_started:
            time_elapsed = time.time() - right_start_time
            if time_elapsed > 3:
                right_exercise_started = False
            else:
                if (
                    right_wrist.x < right_eye.x
                    and (left_shoulder.y - right_shoulder.y)
                    > shoulder_movement_threshold
                ):
                    right_side_exercise_count += 1
                    print("right", flush=True)
                    right_exercise_started = False

        if left_exercise_started:
            time_elapsed = time.time() - left_start_time
            if time_elapsed > 3:
                left_exercise_started = False
            else:
                if (
                    left_wrist.x > left_eye.x
                    and (right_shoulder.y - left_shoulder.y)
                    > shoulder_movement_threshold
                ):
                    left_side_exercise_count += 1
                    print("left", flush=True)
                    left_exercise_started = False

        # 결과를 화면에 그리기
        mp_drawing.draw_landmarks(
            image_rgb, results.pose_landmarks, mp_pose.POSE_CONNECTIONS
        )

    # 화면에 운동 횟수 표시
    cv2.putText(
        image_rgb,
        f"Right Side Count: {right_side_exercise_count}",
        (10, 30),
        cv2.FONT_HERSHEY_SIMPLEX,
        1,
        (0, 255, 0),
        2,
        cv2.LINE_AA,
    )
    cv2.putText(
        image_rgb,
        f"Left Side Count: {left_side_exercise_count}",
        (10, 70),
        cv2.FONT_HERSHEY_SIMPLEX,
        1,
        (0, 255, 255),
        2,
        cv2.LINE_AA,
    )

    # 화면에 이미지 표시
    cv2.imshow("MediaPipe Pose", image_rgb)

    # 양쪽 옆구리 운동 횟수 각 2회 이상일 시 미션 완료 및 프로그램 종료
    if right_side_exercise_count >= 2 and left_side_exercise_count >= 2:
        print("mission success", flush=True)
        playsound("voice/side_success.mp3")
        break

    current_time = time.time()
    elapsed_time = current_time - start_time  # 프로그램 총 경과 시간 계산

    if elapsed_time >= 30:
        print("timeout", flush=True)
        print("mission failed", flush=True)
        playsound("voice/mission_fail.mp3")
        break

    # 'q' 키를 누르면 종료
    if cv2.waitKey(10) & 0xFF == ord("q"):
        break

pose.close()
picam2.stop()
cv2.destroyAllWindows()
