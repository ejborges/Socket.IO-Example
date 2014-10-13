@rem   Author: Emilio Borges
@rem   Date: 24 September 2014

@rem   This is a batch file. To create one, open notepad or some word processor. Write your commands. Save it as .bat 
@rem   Using the @ symbol prevents this line from printing and the 'rem' command can be used to make comments, see links below
@rem   http://stackoverflow.com/questions/11269338/how-can-i-comment-out-a-section-in-a-batch-file-and-how-can-i-add-comments-to
@rem   http://stackoverflow.com/questions/12168527/batch-file-to-run-a-command-in-cmd-within-a-directory
@rem   What is the START for? - http://ss64.com/nt/start.html
@rem   What is the /c for? - http://ss64.com/nt/cmd.html
@rem   What is $~dp0 for? - http://stackoverflow.com/a/17064031
@rem   cd.. is to go up a directory

start cmd.exe /c "cd %~dp0 & cd.. & nodemon server.js"