@echo off
setlocal enabledelayedexpansion

:: Nome do script e do arquivo de controle
set "scriptname=%~nx0"
set "controlfile=.ext_state.tmp"

:: Verifica qual foi a última extensão aplicada
if exist "%controlfile%" (
    set /p last_ext=<"%controlfile%"
) else (
    set "last_ext=txt"
)

:: Define a nova extensão com base na última utilizada
if "%last_ext%"=="txt" (
    set "new_ext=php"
    set "target_ext=txt"
) else (
    set "new_ext=txt"
    set "target_ext=php"
)

echo Alterando todos os arquivos de .%target_ext% para .%new_ext%...
echo --------------------------------------------------

:: Renomeia os arquivos
for %%F in (*) do (
    :: Garante que não vai renomear o próprio script nem o arquivo de controle
    if "%%F" NEQ "!scriptname!" (
        if "%%F" NEQ "!controlfile!" (
            ren "%%F" "%%~nF.%new_ext%"
        )
    )
)

:: Salva o estado atual para a próxima execução
echo %new_ext%>"%controlfile%"

echo --------------------------------------------------
echo Concluido! Todos os arquivos agora sao .%new_ext%
pause
