const urlModel = require('../models/urlModels')


exports.getAllUrls = async(req,res) => {
    try {
        const user_id = req.user.id
        const allUrls = await urlModel.getAllUrls(user_id)
        res.status(200).json({message : "All Urls",all_urls: allUrls})
    } catch (error) {
        res.status(500).json({message : "Something went wrong", error:error.message})
    }
}

exports.createShortUrl = async (req,res) => {
    try {

        const user_id = req.user.id
        const {long_url} = req.body;
        const {short_url} = await urlModel.createShortUrls(long_url, user_id)
        res.status(201).json({message : "Short url generated"})
    } catch (error) {
        res.status(500).json({message : "Something went wrong", error : error.message})
    }
}

exports.urlHitter = async (req,res) => {
    try {
        const short_url = req.params.short_url;
        const clicks = await urlModel.getClicks(short_url)


        //increment one time 
        const totalClicks = clicks + 1;

        await urlModel.updateClicks(short_url, totalClicks)

        const result = await urlModel.getLongUrlByShortUrl(short_url)
        const url = result[0].long_url
       let finalUrl;

if (url.startsWith("http://") || url.startsWith("https://")) {
  finalUrl = url;
} else {
  finalUrl = `https://${url}`;
}
        

        res.redirect(finalUrl)
    } catch (error) {
        res.status(500).json({messsage : "Something went wrong", error : error.message})
        
    }
}

