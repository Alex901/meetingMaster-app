# Meeting Master

## Description
Meeting Master is a light weight tool for keeping track of when employees are busy, and 
additionally for finding times for meetings where all attending employees are free.

### Backend
There is a separate backend project for this app(https://github.com/Alex901/meetingMaster-backend.git), but as of now that project is hosted on Render and the app is setup to run with a live server. 


## Installation
Step-by-step instructions on how to get a development environment running.

```bash
git clone https://github.com/Alex901/meetingMaster-app.git
cd meetingMaster-app
npm install
npm start
```

## Usage
There are thee different tabs: Meetings, Employees and Data

### Employees
This is the tab where you can handle everything that 
has with you employees to do.

**Create Employee** 
for creating a new employee, you don't need to enter 
a name if you don't want, and they will be named "New Employee n" 

**Employee List** 
Here you get a listing of all current employees

**Delete employee** 
With the trash can icon, you can delete an employee

**Add to busy schedule** 
Using the icon of a calendar with an X in it. You can simulate busy time. 
It will generate 1-5 busu blocks ranging from 1-2h for the upgcoming 7 
days. You will want to do this for each employee you create.

**See busy schedule** 
Finally, you can see when said employee is busy today. And yes, this updates
on a daily basis. 

### Meetings
The meeting-tab, is where you have everything that is needed to 
handle meetings.

**Create Meeting**
First and foremost, you can create a meeting. To create one, 
you need to fill out all the mandatory data, which is: 
Duration, Select Employees and a start and end date for when 
you want to keep your meeting. After you have done that 
you will get some time suggestions that represents times
where all employees are free... Select one and you can 
create you meeting. 

The other fields are relly jusst there to make things look
more cohesive. But feel free to fill them out. 

**Meeting list**
A list of all the upcoming meetings, where you can see details 
about them, including all employees attending the meeting.

### Data
This is a simple tab for uploading legacy data. In all simplicity
you can select a .txt file, hit upload data. And if it is a valid
file, it will be uploaded to the server and its data parsed into 
the application. 

---

And that is about it,
Enjoy



###Contact###
Alexander Winberg – alexander.winberg.036@gmail.com
Project Link: https://github.com/Alex901/meetingMaster-app.git