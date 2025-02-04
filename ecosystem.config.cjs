module.exports = {
  apps: [
    {
      name: "codeit_fs03_p4_aws_express", // 프로세스 이름
      script: "./src/app.js", // 실행할 파일 경로
      instances: 1, // 최대 CPU 코어 개수만큼 실행 (0 또는 max)
      exec_mode: "cluster", // 클러스터 모드 (멀티 프로세스 실행)
      watch: true, // 파일 변경 시 자동 재시작
      autorestart: true, // 서버가 크래시 되면 자동 재시작
      env: {
        NODE_ENV: "production", // 개발 환경
        PORT: 8000, // 개발용 포트
      },
    },
  ],
};