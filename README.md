First Project: BrewDog Browser

**Live site:**
https://merbashert.github.io/brewdog-app/

Technologies Used:
• HTML
• CSS
• JavaScript
• jQuery

Resources:
PunkAPI
https://punkapi.com/

Site Functionality:

Nav Bar:
• Sticky navbar
• Link to BrewDogs official website
• Download link for Brew Dogs back catalog/recipe book
• My Favorite Beers: 
	• Favorite Beers are stored in Local Storage as strings and retrieved upon each reload.  Page uses JSON stringify to save local storage values as strings, and pushed 	the strings to an array.  Upon page load, the site checks to see if favorite beers has a value using JSON parse to turn strings back into an object.  If local storage has 	no values, a new array is created.  Then stringify is used to change the objects back into strings, and a for loop appends each string to the Favorite Beers modal. 
	• Clicking on My Favorite Beers in navbar will make beer list modal appear via slideToggle, and clicking on it again will make it disappear.  The beer list modal has a 	position of fixed and will stay open while browsing the page, in case the user wants to reference beer list while using site.  
	• Hide button included in beer list will also make the beer list disappear by slideToggle.
	• Clear button will clear Local Storage of all saved favorite beers


Search Box:
Search function for searching BrewDog beer database:
	•Search by name of beer
	•Search by minimum and maximum ABV
	•Search by minimum and maximum IBU
	•Search by food pairing

Search parameters can be submitted by clicking the button for the specific search category or by hitting return.  If the field is not filled out, an alert will prompt the user to enter the requested values.  

ABV and IPU buttons have a hover function that will display an explanation of what the terms mean at the bottom of the search box.  In mobile version, instructions appear to tap on the button to get an explanation of what the terms mean.

Search results are returned as beer names, along with instructions to click on an individual beer to see more information about it.   Beer names can be clicked on again to hide the extra info.  

Search results are also returned with an option to add beer to Favorite Beers.  When a beer is added to Favorite Beers, the modal attached to the Favorite Beers in the navbar appears and disappears again, to indicate beer has been added.  Favorite Beers is stored in local storage as strings and will always be available in the favorites box upon reload.   

Reset button empties previous search results div as well as instructions about clicking on a beer for more info.


Random Beer:
Random beer box has background image of beer bottle.  Text on top of beer bottle is clickable and will use the Random Beer function of the PunkAPI to return the value of a random beer.  Upon return, the text on top of the beer bottle disappears and the info for the random beer appears.  The random beer info area becomes clickable, and can be clicked on to run the Random Beer functions again.


Strong Beers History:
Strong Beers is made up of two carousels that are running simultaneously.  One shows the images of the beer and the other shows the information about the beer. Values are declared at the top of Javascript.  Each button calls a function that loops through both carousels using if statements and a jQuery .eq to check the index of the currently displayed image and text.  


Responsive Design:
Site is designed mostly with percentages and works on all widths of web use, as well as on mobile.  Elements that needed to remain a certain height due to room for background images or text that eventually appears within the element were assigned concrete pixel values and change with media queries.  ABV and IBU hover functions have a specific functionality for mobile since hover is not available on mobile devices.
