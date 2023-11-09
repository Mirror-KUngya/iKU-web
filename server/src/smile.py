import time
import cv2
import mediapipe as mp
import numpy as np
import sys
import collections
from picamera2 import Picamera2
from playsound import playsound

playsound("voice/smile_start.mp3")
print("loading", flush=True)

# MediaPipe FaceMesh 초기화
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(max_num_faces=1)

# DrawingSpec 설정
drawing_spec = mp.solutions.drawing_utils.DrawingSpec(thickness=1, circle_radius=1)

# 웹캠에서 비디오를 가져오기
# cap = cv2.VideoCapture(1)

# Picamera2 시작
picam2 = Picamera2()
picam2.start_preview()

fps = 30
# 카메라 설정
camera_config = picam2.create_preview_configuration(main={"size": (1280, 720)})
picam2.configure(camera_config)
picam2.start()

# 이전 입 너비와 입꼬리 상대 y좌표를 저장할 버퍼 (1초분량)
prev_mouth_widths = collections.deque(maxlen=int(fps))
prev_mouth_corners_relative_y = collections.deque(maxlen=int(fps) * 2)  # 양쪽 입꼬리 * 2

# 웃음 감지를 위한 임계값 설정
mouth_width_increase_threshold = 0.02  # 입 너비 증가 임계값
mouth_corner_lift_threshold = 0.008  # 입꼬리 상대적 상승 임계값
return_to_neutral_threshold = -0.015  # 입꼬리 하락 임계값

# 웃는 표정 지속 시간을 측정하기 위한 변수 초기화
smile_start_time = None  # 웃기 시작한 시간
smiling_time = 0  # 웃은 총 시간
start_time = time.time()  # 프로그램 시작 시간


while True:
    # ret, frame = cap.read()
    # if not ret:
    #     continue

    # if not camera_started_flag:  # 카메라 시작 플래그를 체크합니다.
    #     print("Camera started")  # 카메라가 시작되면 이 메시지를 출력합니다.
    #     sys.stdout.flush()
    #     camera_started_flag = True  # 플래그를 설정하여 메시지가 다시 출력되지 않도록 합니다.

    # if time.time() - start_time > 5:  # 5초 후 종료 조건 검사
    #     break

    # # RGB로 변환
    # rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # # 얼굴 랜드마크 감지
    # results = face_mesh.process(rgb_frame)

    # Picamera2로부터 이미지 프레임 받아오기
    frame = picam2.capture_array()
    if frame is None:
        print("Error receiving frame from Picamera2.")
        break

    image_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = face_mesh.process(image_rgb)

    image_bgr = cv2.cvtColor(image_rgb, cv2.COLOR_RGB2BGR)
    # 웃음 감지
    is_smiling = False

    # # 감지된 랜드마크가 있는 경우
    if results.multi_face_landmarks:
        for landmarks in results.multi_face_landmarks:
            # 입꼬리 랜드마크 인덱스: 61, 291
            # 상, 하 입술의 중앙 랜드마크 인덱스: 0, 17 (대략적인 중앙점 참고)
            left_mouth_corner = landmarks.landmark[61]
            right_mouth_corner = landmarks.landmark[291]
            upper_lip_center = landmarks.landmark[0]
            lower_lip_center = landmarks.landmark[17]

            # 입의 중앙점 계산
            mouth_center_y = (upper_lip_center.y + lower_lip_center.y) / 2

            # 현재 프레임의 입꼬리 상대 y좌표와 너비 계산
            current_mouth_width = abs(right_mouth_corner.x - left_mouth_corner.x)
            current_left_corner_relative_y = left_mouth_corner.y - mouth_center_y
            current_right_corner_relative_y = right_mouth_corner.y - mouth_center_y

            # 이전 데이터 저장
            prev_mouth_widths.append(current_mouth_width)
            prev_mouth_corners_relative_y.append(current_left_corner_relative_y)
            prev_mouth_corners_relative_y.append(current_right_corner_relative_y)

            # 웃음 감지
            if len(prev_mouth_widths) >= 1 and len(prev_mouth_corners_relative_y) >= 2:
                one_second_ago_width = prev_mouth_widths[0]
                one_second_ago_left_corner_relative_y = prev_mouth_corners_relative_y[0]
                one_second_ago_right_corner_relative_y = prev_mouth_corners_relative_y[
                    1
                ]

                mouth_width_change = current_mouth_width - one_second_ago_width
                mouth_corners_lift = (
                    one_second_ago_left_corner_relative_y
                    - current_left_corner_relative_y
                    + one_second_ago_right_corner_relative_y
                    - current_right_corner_relative_y
                ) / 2

                if (
                    mouth_width_change > mouth_width_increase_threshold
                    and mouth_corners_lift > mouth_corner_lift_threshold
                ):
                    if smile_start_time is None:
                        smile_start_time = time.time()  # 웃기 시작한 시간 기록
                    is_smiling = True
                    cv2.putText(
                        image_rgb,
                        "Smiling",
                        (50, 50),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        1,
                        (255, 255, 255),
                        2,
                    )

                elif (
                    mouth_width_change < return_to_neutral_threshold
                    and mouth_corners_lift < return_to_neutral_threshold
                ):
                    if smile_start_time is not None:
                        # smiling_time += time.time() - smile_start_time  # 웃은 시간 누적
                        smile_start_time = None  # 웃음 시간 기록 리셋

            mp.solutions.drawing_utils.draw_landmarks(
                image_rgb,
                landmarks,
                mp_face_mesh.FACEMESH_CONTOURS,
                landmark_drawing_spec=drawing_spec,
            )

    # 웃음 지속 시간 표시
    if smile_start_time is not None:
        # 현재 웃고 있는 경우 지속 시간 업데이트
        current_smiling_time = time.time() - smile_start_time
        smiling_time = previous_smiling_time + current_smiling_time
        cv2.putText(
            image_rgb,
            f"Smiling for: {current_smiling_time:.2f} sec",
            (50, 150),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            (255, 255, 255),
            2,
        )
        cv2.putText(
            image_rgb,
            f"Total smiling time: {smiling_time:.2f} sec",
            (50, 100),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            (255, 255, 255),
            2,
        )

    else:
        # 웃음이 멈춘 경우 누적된 웃음 시간 표시
        previous_smiling_time = smiling_time

        cv2.putText(
            image_rgb,
            f"Total smiling time: {smiling_time:.2f} sec",
            (50, 100),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            (255, 255, 255),
            2,
        )

    # 화면에 결과 표시
    cv2.imshow("Smile Detector", image_rgb)

    # 프로그램 종료 조건 확인
    current_time = time.time()
    elapsed_time = current_time - start_time  # 프로그램 총 경과 시간 계산

    if smiling_time >= 5:
        print("mission success")
        break

    if elapsed_time >= 15:
        print("mission failed")
        break

    # 'q'를 누르면 반복문 탈출
    if cv2.waitKey(5) & 0xFF == ord("q"):
        break

    # # 'q'를 누르면 프로그램 종료 (이 부분은 필요에 따라 제거할 수 있습니다)
    # if cv2.waitKey(1) & 0xFF == ord("q"):
    #     break

# 자원 해제
# cap.release()

# 자원 해제
picam2.stop_preview()
picam2.stop()
cv2.destroyAllWindows()
face_mesh.close()
