import cv2
import mediapipe as mp
import numpy as np
import sys
import time

mp_drawing_styles = mp.solutions.drawing_styles
mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose

# 설정값
pose = mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5)

# 웹캠에서 비디오 스트림 시작
cap = cv2.VideoCapture(1)

if not cap.isOpened():
    print("Error opening video stream or file")
    sys.exit()

frame_width = int(cap.get(3))
frame_height = int(cap.get(4))

# 박수 감지 관련 변수 초기화
clap_count = 0
hand_distance_threshold = 100  # 손 사이의 거리 임계값을 늘렸습니다
y_coordinate_threshold = 5
left_hand_position = None
right_hand_position = None
previous_hand_distance = np.inf  # 초기 거리는 무한대로 설정
last_clap_time = 0
clapping = False  # 박수 상태 추적 변수

camera_started_flag = False  # 카메라 시작 플래그 초기화

start_time = time.time()  # 시작 시간 기록

while cap.isOpened():
    ret, image = cap.read()
    if not ret:
        print("Error receiving frame from webcam.")
        break

    if not camera_started_flag:  # 카메라 시작 플래그를 체크합니다.
        print("Camera started")  # 카메라가 시작되면 이 메시지를 출력합니다.
        sys.stdout.flush()
        camera_started_flag = True  # 플래그를 설정하여 메시지가 다시 출력되지 않도록 합니다.

    if time.time() - start_time > 5:  # 5초 후 종료 조건 검사
        break

    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    results = pose.process(image_rgb)

    if results.pose_landmarks:
        mp_drawing.draw_landmarks(
            image,
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

            # 손이 멀어졌다가 다시 가까워지는 것을 감지합니다.
            if (
                hand_distance < hand_distance_threshold
                and previous_hand_distance > hand_distance
            ):
                if not clapping:
                    current_time = time.time()
                    if current_time - last_clap_time > 1:
                        clap_count += 1
                        print("clap", clap_count, flush=True)
                        last_clap_time = current_time
                clapping = True
            elif hand_distance > hand_distance_threshold:
                clapping = False  # 손이 멀어졌을 때 clapping 상태를 해제합니다.

            previous_hand_distance = hand_distance

    # 영상에 박수 횟수 표시
    cv2.putText(
        image,
        f"Clap Count: {clap_count}",
        (50, 50),
        cv2.FONT_HERSHEY_SIMPLEX,
        1,
        (0, 255, 0),
        2,
    )

    # 화면에 결과를 표시합니다.
    # cv2.imshow("MediaPipe Pose", image)

    # ESC 키를 누르면 종료합니다.
    if cv2.waitKey(1) & 0xFF == 27:
        break

pose.close()
cap.release()
cv2.destroyAllWindows()
