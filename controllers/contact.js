var contact = require('../model/contact')

exports.creatcontact = async (req, res, next) => {
    try {
        const { name, email, phone, address, userID } = req.body
        const newContact = await contact.create({ name, email, phone, address,userID })
        // await newContact.save()

        res.status(201).json({
            status: "success",
            message: 'Contact created successfully',
            data: newContact
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail",
            message: error.message,
        })
    }
};

exports.readcontact = async function (req, res, next) {
    try {
        let findData;
        if (req.query.search) {
            findData = await contact.find({
                $or: [
                    { name: { $regex: req.query.search, $options: 'i' } },
                    { email: { $regex: req.query.search, $options: 'i' } },
                    { phone: { $regex: req.query.search, $options: 'i' } },
                    { address: { $regex: req.query.search, $options: 'i' } },
                    ]
            });
            } else {
                findData = await contact.find({userID : req.user }).populate('userID');
                }   
        res.status(200).json({
            status: "Success",
            message: "contact Data Found",
            data: findData
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
};

exports.deletecontact = async function (req, res, next) {
    try {
        let findData = await contact.findById(req.params.id)
        if (!findData) throw new Error('contact not found')

        await contact.findByIdAndDelete(req.params.id)

        res.status(200).json({
            status: "Success",
            message: "contact Delete Successfull",
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
};

exports.updatecontact = async function (req, res, next) {
    try {
        let findData = await contact.findById(req.params.id)
        if (!findData) throw new Error('contact not found')
            
        let updateData = await contact.findByIdAndUpdate(req.params.id, req.body, { new: true })

        res.status(200).json({
            status: "Fail",
            message: "Contact Update Successfull",
            data: updateData
        })
    } catch (error) {
        res.status(404).json({  
            status: "Fail",
            message: error.message
        })
    }
};