@echo off
color 4
setlocal enabledelayedexpansion

set "loop=0"
set "progress=In progress..."
set "count=0"

:loop
cls
echo.
echo  ------------------------------------------------------------
echo  ^|                                         _                ^|
echo  ^|                                        ^| ^|               ^|
echo  ^|             ___  _ __    ___   ___   __^| ^|               ^| 
echo  ^|            / __^|^| '_ \  / _ \ / _ \ / _` ^|               ^|
echo  ^|            \__ \^| ^|_^) ^|^|  __/^|  __/^| (_^| ^|               ^|
echo  ^|            ^|___/^| .__/  \___^| \___^| \__^,_^|               ^|
echo  ^|                 ^| ^|                                      ^|
echo  ^|                 ^|_^|                                      ^| 
echo  ------------------------------------------------------------
echo.
echo %progress%
set /A count+=1
if !count! equ 5 (
    goto :end
) else (
    timeout /t 1 >nul
    set "progress=!progress:~0,-1!"
    goto :loop
)

:end
if !loop! equ 2 (
    goto :fin
) else (
    set "count=0"
    set "progress=In progress..."
    set /A loop+=1
    goto :loop

)
:fin
cls
echo.
echo  ------------------------------------------------------------
echo  ^|                                         _                ^|
echo  ^|                                        ^| ^|               ^|
echo  ^|             ___  _ __    ___   ___   __^| ^|               ^| 
echo  ^|            / __^|^| '_ \  / _ \ / _ \ / _` ^|               ^|
echo  ^|            \__ \^| ^|_^) ^|^|  __/^|  __/^| (_^| ^|               ^|
echo  ^|            ^|___/^| .__/  \___^| \___^| \__^,_^|               ^|
echo  ^|                 ^| ^|                                      ^|
echo  ^|                 ^|_^|                                      ^| 
echo  ------------------------------------------------------------
echo.
echo Please note that it may take some time.
echo Exit: Ctrl + C
timeout /t 3 >nul
cls
echo.
echo  ------------------------------------------------------------
echo  ^|                                         _                ^|
echo  ^|                                        ^| ^|               ^|
echo  ^|             ___  _ __    ___   ___   __^| ^|               ^| 
echo  ^|            / __^|^| '_ \  / _ \ / _ \ / _` ^|               ^|
echo  ^|            \__ \^| ^|_^) ^|^|  __/^|  __/^| (_^| ^|               ^|
echo  ^|            ^|___/^| .__/  \___^| \___^| \__^,_^|               ^|
echo  ^|                 ^| ^|                                      ^|
echo  ^|                 ^|_^|                                      ^| 
echo  ------------------------------------------------------------
echo.
python wifispeed.py