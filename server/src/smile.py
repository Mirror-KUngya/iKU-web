import time
import cv2
import mediapipe as mp
import sys
import collections
from playsound import playsound

playsound("voice/smile_start.mp3")
print("loading", flush=True)

# MediaPipe FaceMesh 초기화
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(max_num_faces=1)

# DrawingSpec 설정
drawing_spec = mp.solutions.drawing_utils.DrawingSpec(thickness=1, circle_radius=1)

# 웹캠에서 비디오를 가져오기
cap = cv2.VideoCapture(1)

# 프레임레이트를 확인
fps = cap.get(cv2.CAP_PROP_FPS)
if fps < 1:
    # 대체 프레임레이트 설정
    fps = 30

# 이전 입 너비와 입꼬리 상대 y좌표를 저장할 버퍼 (1초분량)
prev_mouth_widths = collections.deque(maxlen=int(fps))
prev_mouth_corners_relative_y = collections.deque(maxlen=int(fps) * 2)  # 양쪽 입꼬리 * 2

# 웃음 감지를 위한 임계값 설정
mouth_width_increase_threshold = 0.02  # 입 너비 증가 임계값
mouth_corner_lift_threshold = 0.008  # 입꼬리 상대적 상승 임계값


camera_started_flag = False  # 카메라 시작 플래그 초기화

start_time = time.time()  # 시작 시간 기록

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        continue

    if not camera_started_flag:  # 카메라 시작 플래그를 체크합니다.
        print("Camera started")  # 카메라가 시작되면 이 메시지를 출력합니다.
        sys.stdout.flush()
        camera_started_flag = True  # 플래그를 설정하여 메시지가 다시 출력되지 않도록 합니다.

    if time.time() - start_time > 5:  # 5초 후 종료 조건 검사
        break

    # RGB로 변환
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # 얼굴 랜드마크 감지
    results = face_mesh.process(rgb_frame)

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

            # 1초 전의 프레임과 입꼬리 상대 위치 및 너비 비교
            if len(prev_mouth_widths) >= 1 and len(prev_mouth_corners_relative_y) >= 2:
                # 1초 전 프레임의 데이터 가져오기
                one_second_ago_width = prev_mouth_widths[0]
                one_second_ago_left_corner_relative_y = prev_mouth_corners_relative_y[0]
                one_second_ago_right_corner_relative_y = prev_mouth_corners_relative_y[
                    1
                ]

                # 입 너비가 넓어졌는지 및 입꼬리가 상대적으로 올라갔는지 확인
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
                    cv2.putText(
                        frame,
                        "Smiling",
                        (50, 50),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        1,
                        (255, 255, 255),
                        2,
                    )
                    print("smile", flush=True)  # 표준 출력으로 "Smiling" 메시지 출력

                else:
                    print("not", flush=True)

                    # 현재 프레임의 데이터를 저장
            prev_mouth_widths.append(current_mouth_width)
            prev_mouth_corners_relative_y.append(current_left_corner_relative_y)
            prev_mouth_corners_relative_y.append(current_right_corner_relative_y)

            # 얼굴 랜드마크 그리기 (기본 DrawingSpec 사용)
            mp.solutions.drawing_utils.draw_landmarks(
                frame,
                landmarks,
                mp_face_mesh.FACEMESH_CONTOURS,
                drawing_spec,
                drawing_spec,
            )
    # 화면에 결과 표시
    cv2.imshow("Face Landmarks", frame)

    # # 'q'를 누르면 프로그램 종료 (이 부분은 필요에 따라 제거할 수 있습니다)
    # if cv2.waitKey(1) & 0xFF == ord("q"):
    #     break

# 자원 해제
cap.release()
