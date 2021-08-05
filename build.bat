CALL rd /s /q "dist"
CALL rd /s /q "build"
CALL tsc
CALL del /S dist\*.map
CALL node node_modules/webpack/bin/webpack.js --display-modules -p
CALL install-local.bat