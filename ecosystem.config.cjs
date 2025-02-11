module.exports = {
  apps: [
    {
      name: "codeit_fs03_p4_aws_express", // 프로세스 이름
      script: "./src/app.js", // 실행할 파일 경로
      instances: 1, // max로 설정 시 최대 CPU 코어 개수만큼 실행
      exec_mode: "cluster", // 클러스터 모드 (fork - 한 개, cluster - 여러 개)
      watch: true, // 파일 변경 시 자동 재시작
      // max_memory_restart: "1G", // 메모리 사용량이 1GB를 넘으면 재시작
      autorestart: true, // 서버가 크래시 되면 자동 재시작

      // 환경변수 설정 (기본값)
      env: {
        NODE_ENV: "development",
        PORT: 3000
      },
      // 프로덕션 환경에서 사용할 환경변수 (PM2를 --env production 옵션과 함께 실행)
      env_production: {
        NODE_ENV: "production",
        PORT: 8000
      },

      // 로그 설정
      log_date_format: "YYYY-MM-DD HH:mm Z", // 로그 출력 형식

      // 로그 파일 설정
      error_file: "./logs/err.log", // 에러 로그 파일
      out_file: "./logs/out.log", // 일반 로그 파일
      combine_logs: true, // 에러 로그와 일반 로그를 하나의 파일에 출력
    },
  ],
};