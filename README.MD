1. install:
	- nodejs v4.0.0 or above
	- npm v2.0.0 or above
	- gulp (global)
	* recommend Nodist or any node version controller.
	* make sure nodejs folder in the Path in system environment variable.
	
2. "npm install" in the root (where the index.html file)

3. Install PowerShell (Windows management framework v4 or above).
   - Switch PowerShell execution policy: 
	 "Set-ExecutionPolicy Unrestricted"
	 * run this command in x86 as Administrator mode cmd in x64 OS.

4. Run gulp task "server" in the root folder. It will launch karma jasmine test runner, and start the website : "gulp server"
	- Website : http://localhost:7750/
	- Unit Tests
		a. %your_folder%/W5Days/_reports/html-results.html
		b. http://localhost:7750/jasmine/test.html
	* just lauch "node" task if you want to run just website.

Note: Chrome browser won't return back coordinate in HTTP anymore. Please run this website locally to get the result properly. 


- Used Libraries:
  1. KnockoutJs: http://knockoutjs.com/
  2. Skycons: https://github.com/darkskyapp/skycons
  2. Light JSONP: https://github.com/OscarGodson/JSONP
