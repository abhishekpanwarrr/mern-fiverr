import Gig from "../models/gig.model.js"
import createError from "../utils/createError.js"

export const createGig = async(req,res,next) => {
    if(!req.isSeller) return next(createError(403, "Only sellers can create a gig"))

    const newGig = new Gig({
        userId: req.userId, 
        ...req.body, 
    })
    try {
        const saveGig = await newGig.save()
        res.status(201).json(saveGig)
    } catch (error) {
        next(createError(error));
    }
}
export const deleteGig = async(req,res,next) => {
    try {
        const gig = await Gig.findById(req.params.id)
        if(gig.userId !== req.userId) return next(createError(403, "You can only delete your gig"));

        await Gig.findByIdAndDelete(req.params.id)
        res.status(200).json("Gig deleted successfully")
    } catch (error) {
        next(createError(error));
    }
}
export const getGig = async(req,res,next) => {
    try {
        const gig = await Gig.findById(req.params.id)
        if(!gig) return next(createError(404, "Requested gig not found"));
        res.status(200).json(gig)
    } catch (error) {
        next(createError(error));
    }
}
export const getGigs = async(req,res,next) => {
    const query = req.query

    const filters = {
        ...(query.userId && {userId:query.userId}),
        ...(query.cat && {cat:query.cat}),
        ...((query.min || query.max ) && {price:{...(query.min && {$gt:query.min}),...(query.max && {$lt:query.max})}}),
       ...(query.search && {title:{$regex:query.search, $options:"i"}})
    }
    try {
        const gigs = await Gig.find(filters).sort({[query.sort]:-1})
        if(!gigs) return next(createError(404, "Requested gig not found"));
        res.status(200).json(gigs)
    } catch (error) {
        next(createError(error));
    }
}