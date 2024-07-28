import asyncHandler from "express-async-handler";
import Contact from '../models/contactModel.js';
// whenever we create api methods, we create some labels for them
/** 
 * @desc Get all contacts
 * @route GET /api/contacts
 * @access private
 */

const getContact = asyncHandler(async(req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
})

/** 
 * @desc Get contact for specific id
 * @route GET /api/contacts/:id
 * @access private
 */

const getContactForId = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }
    res.status(200).json(contact);
})

/** 
 * @desc Create contact
 * @route POST /api/contacts/
 * @access private
 */

const createContact = asyncHandler(async(req, res) => {
    const { name, email, phone } = req.body;
    console.log(name, email, phone)
    // console.log(req.body);// will throw undefined if middleware (parser) is not defined
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const contact = await Contact.create({
        name, 
        email, 
        phone,
        user_id: req.user.id
    })
    res.status(201).json(contact);
})

/** 
 * @desc Update contact
 * @route PUT /api/contacts/:id
 * @access private
*/

const updateContactId = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    console.log('contact', contact);
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User not authorized to update other user's contact.")
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true}
    )
    console.log('Contact updated successfully');
    res.status(200).json(updatedContact);
})

/** 
 * @desc Delete contact
 * @route DELETE /api/contacts/:id
 * @access public
*/

const deleteContactId = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User not authorized to update other user's contact.")
    }
    console.log('contact to be deleted', contact);
    await Contact.deleteOne();
    console.log('contact deleted successfully!');
    res.status(200).json(contact);
})

export default { getContact, getContactForId, createContact, updateContactId, deleteContactId };

// async handler(middleWare) avoids taking use of try-catch block for cataching errors.
// automatically calls for errorHandling file