import time
import cv2
import mediapipe as mp
import sys

# MediaPipe FaceMesh 초기화
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(max_num_faces=1)

# 웹캠에서 비디오를 가져오기
cap = cv2.VideoCapture(1)
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
            # 입의 끝 부분 랜드마크 인덱스: 61, 291
            # 입의 중간 부분 랜드마크 인덱스: 0, 17
            upper_lip = (landmarks.landmark[61].y + landmarks.landmark[291].y) / 2
            lower_lip = (landmarks.landmark[0].y + landmarks.landmark[17].y) / 2

            # 웃는 정도를 감지하기 위해 상단 입과 하단 입의 거리를 확인
            if (lower_lip - upper_lip) > 0.02:  # 이 값은 조정이 필요할 수 있음
                print("smile", flush=True)  # 표준 출력으로 "Smiling" 메시지 출력
                break
            else:
                print("not", flush=True)
    # # 'q'를 누르면 프로그램 종료 (이 부분은 필요에 따라 제거할 수 있습니다)
    # if cv2.waitKey(1) & 0xFF == ord("q"):
    #     break

# 자원 해제
cap.release()
