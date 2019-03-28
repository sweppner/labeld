# Introductions

LabelD was created as a simple image annotation tool to minimize the amount of work/time spent on annotation by streamlining the overall process. The images can either be pulled from Imgur based on keyword search (search button at the top right), or locally (please un-select Imgur as the image source under Annotation Settings).

# Installation

LabelD is simple enough to get up and running.

1. Clone/Download the LabelD source code
2. Satisfy the required dependencies
3. Launch the 2 required nodejs servers web_server.js and node/rest/rest_server.js
4. (optional) If there are local images the user wishes to annotate, copy them into the node/rest/data


# Dependencies

- NodeJS
- NPM
- NPM module - express
- NPM module - body-parser
- MongoDB

And... you're done!

If you dont have an image base to start from, this may be the easiest platform to begin building a training set. It comes default with the ability to pull keyword indexed images from Imgur, so try it out! 

1. Put a keyword in the search box at the top right
2. Hit enter
3. Click "NEXT"

Thats it!
