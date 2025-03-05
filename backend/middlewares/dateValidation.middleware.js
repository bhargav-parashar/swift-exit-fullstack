const country = process.env.COUNTRY;
const year = process.env.YEAR;
const API_KEY = process.env.CALENDARIFIC_API_KEY;
const API_URL = process.env.CALENDARIFIC_API_URL;
const API_ENDPOINT = `${API_URL}/holidays?&api_key=${API_KEY}&country=${country}&year=${year}`;

const dateValidation =async (req,res,next) =>{
    try{
        const fetch = (await import("node-fetch")).default; // Dynamically import node-fetch
        const date = new Date(req.body.lwd);
       /*CHECK IF LWD IS WEEKEND*/
        if(date.getDay() % 6 === 0)
            return res.status(400).json({ message:"Last working date cannot be a weekend", holiday: date.toLocaleDateString("en-IN", { weekday: 'long' })});
        

        /*CHECK IF LWD IS NATIONAL HOLIDAY*/
        const fetch_response = await fetch(API_ENDPOINT);
        const json = await fetch_response.json();
        const holidays = json.response.holidays.filter((item)=>item.date.iso === req.body.lwd );
        if(holidays.length > 0){
            let string = '';
            for(let i = 0; i < holidays.length;  i++){
                string += holidays[i].name;
                if(i !== holidays.length-1)
                    string += ', ';
                else
                    string += '.';
            }
            return res.status(400).json({ message:"Last working date cannot be a National Holiday", holiday: string});
        }
            
        next();


    }catch(err){
        res.status(500).json({ message:"Something went wrong",err});
    }

};

module.exports = {dateValidation};

