@rem   Author: Emilio Borges
@rem   Date: 24 September 2014

@rem   This is a batch file. To create one, open notepad or some word processor. Write your commands. Save it as .bat 
@rem   Using the @ symbol prevents this line from printing and the 'rem' command can be used to make comments, see links below
@rem   http://www.robvanderwoude.com/comments.php
@rem   http://stackoverflow.com/questions/11269338/how-can-i-comment-out-a-section-in-a-batch-file-and-how-can-i-add-comments-to

@rem   This file must be run as an administrator to work properly. To do that, right click on the file and select 'Run as administrator'
@rem   As long as this batch file is running, it will make sure the node server 'node.exe' is running. 
@rem   If node crashes internlly and node.exe is still running (the crash didn't terminate node.exe), this will not be able to detect that and restart the server. Node should be able to handle that on its own.

@rem   Helpful links:
@rem   http://ss64.com/nt/    -- You can find a lot of the CMD commands here
@rem   http://www.instructables.com/answers/Check-if-a-process-is-running-from-a-batch-file/
@rem   http://stackoverflow.com/questions/162291/how-to-check-if-a-process-is-running-via-a-batch-script
@rem   http://stackoverflow.com/questions/12168527/batch-file-to-run-a-command-in-cmd-within-a-directory
@rem   http://www.sevenforums.com/general-discussion/12936-how-run-batch-file-admin-2.html
@rem   What is $~dp0 for? - http://stackoverflow.com/a/17064031

@rem   the colon ':' is used to define a label you can use with 'goto' commands to jump around your code
@rem   echo. prints out a new blank line
@rem   cd.. is to go up a directory
@rem   sleep 1 waits for 1 second before continuing





@echo off
:start
tasklist /nh /fi "imagename eq node.exe" | find /i "node.exe" >nul && (
@rem   Do nothing if node.exe is already running. Sit back, relax, take a break. 
) || (
echo.
echo ERROR: Socket.IO Test Node.JS server is NOT running on %date% %time%
echo        RESTARTING server...
echo.

start cmd.exe /c "cd %~dp0 & cd.. & nodemon server.js"

)
sleep 1
goto start