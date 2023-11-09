import cv2
import mediapipe as mp
import numpy as np
import sys
import time
from picamera2 import Picamera2
from playsound import playsound

playsound("voice/clap_start.mp3")
print("loading", flush=True)

mp_drawing_styles = mp.solutions.drawing_styles
mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose

# 설정값
pose = mp_pose.Pose(
    min_detection_confidence=0.8,
    min_tracking_confidence=0.3,
    model_complexity=1,  # 기본값은 1, 가능한 값은 0, 1, 또는 2입니다.
)

# 웹캠에서 비디오 스트림 시작
# cap = cv2.VideoCapture(1)

# if not cap.isOpened():
#     print("Error opening video stream or file")
#     sys.exit()

# frame_width = int(cap.get(3))
# frame_height = int(cap.get(4))

# Picamera2 시작
picam2 = Picamera2()
picam2.start_preview()

# 카메라 설정
camera_config = picam2.create_preview_configuration(main={"size": (1280, 720)})
picam2.configure(camera_config)
picam2.start()

frame_width, frame_height = picam2.sensor_resolution

# 박수 감지 관련 변수 초기화
clap_count = 0
hand_distance_threshold = 650
previous_hand_distance = np.inf
last_clap_time = 0
clapping = False
hands_crossed = False
hand_distance = 0
start_time = time.time()  # 프로그램 시작 시간

camera_started_flag = False  # 카메라 시작 플래그 초기화

while True:
    # Picamera2로부터 이미지 프레임 받아오기
    image = picam2.capture_array()
    if image is None:
        print("Error receiving frame from Picamera2.")
        break

    if not camera_started_flag:  # 카메라 시작 플래그를 체크합니다.
        print("Camera started")  # 카메라가 시작되면 이 메시지를 출력합니다.
        sys.stdout.flush()
        camera_started_flag = True  # 플래그를 설정하여 메시지가 다시 출력되지 않도록 합니다.

    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = pose.process(image_rgb)
    image_bgr = cv2.cvtColor(image_rgb, cv2.COLOR_BGR2RGB)

    if results.pose_landmarks:
        mp_drawing.draw_landmarks(
            image_rgb,
            results.pose_landmarks,
            mp_pose.POSE_CONNECTIONS,
            landmark_drawing_spec=mp_drawing_styles.get_default_pose_landmarks_style(),
        )

        left_hand = results.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_WRIST]
        right_hand = results.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_WRIST]

        if left_hand.visibility > 0.5 and right_hand.visibility > 0.5:  # 손목의 가시성 확인
            left_hand_x, left_hand_y = int(left_hand.x * frame_width), int(
                left_hand.y * frame_height
            )
            right_hand_x, right_hand_y = int(right_hand.x * frame_width), int(
                right_hand.y * frame_height
            )
            hand_distance = np.sqrt(
                (left_hand_x - right_hand_x) ** 2 + (left_hand_y - right_hand_y) ** 2
            )

            # 현재 손이 교차되었는지 여부를 판단합니다.
            current_hands_crossed = left_hand_x < right_hand_x

            # 손이 멀어졌다가 다시 가까워지는 것을 감지합니다.
            if (
                hand_distance < hand_distance_threshold
                and previous_hand_distance > hand_distance
            ):
                if (
                    not clapping and not hands_crossed
                ):  # 박수 상태가 아니고 손이 교차되지 않은 경우에만 박수를 친 것으로 간주합니다.
                    current_time = time.time()
                    if (
                        current_time - last_clap_time > 0.5
                    ):  # 박수 간격이 최소 0.5초 이상일 때만 카운트합니다.
                        clap_count += 1
                        print("clap", clap_count, flush=True)
                        last_clap_time = current_time
                clapping = True
            elif hand_distance > hand_distance_threshold:
                clapping = False  # 손이 멀어졌을 때 clapping 상태를 해제합니다.

            # 손이 교차 상태에서 펼쳐지면 박수 카운트를 감소시킵니다.
            if not current_hands_crossed and hands_crossed and clap_count > 0:
                clap_count -= 1
                print("canceled", flush=True)

            hands_crossed = current_hands_crossed  # 손 교차 상태 업데이트
            previous_hand_distance = hand_distance

    # 영상에 박수 횟수 표시
    cv2.putText(
        image_rgb,
        f"Clap Count: {clap_count}",
        (50, 50),
        cv2.FONT_HERSHEY_SIMPLEX,
        1,
        (0, 255, 0),
        2,
    )

    # 손이 교차된 상태를 화면에 출력합니다.
    cross_status = "Crossed" if hands_crossed else "Not Crossed"
    cv2.putText(
        image_rgb,
        f"Hands Status: {cross_status}",
        (50, 100),
        cv2.FONT_HERSHEY_SIMPLEX,
        1,
        (255, 0, 0),
        2,
    )

    # 두 손 사이의 거리 출력
    cv2.putText(
        image_rgb,
        f"Hands Distance: {hand_distance}",
        (50, 150),
        cv2.FONT_HERSHEY_SIMPLEX,
        1,
        (0, 255, 0),
        2,
    )

    # 화면에 결과를 표시합니다.
    # cv2.imshow("MediaPipe Pose", image_rgb)

    # 박수 3회 이상일 시 미션 완료 및 프로그램 종료
    if clap_count >= 3:
        print("mission success", flush=True)
        playsound("voice/clap_success.mp3")
        break

    current_time = time.time()
    elapsed_time = current_time - start_time  # 프로그램 총 경과 시간 계산

    if elapsed_time >= 15:
        print("mission failed", flush=True)
        break

    # ESC 키를 누르면 종료합니다.
    if cv2.waitKey(1) & 0xFF == 27:
        break

pose.close()
picam2.stop()
cv2.destroyAllWindows()
