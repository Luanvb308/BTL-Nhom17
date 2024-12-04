const { LocationModel } = require('../model/location');

// Hiển thị danh sách Location
const getAllLocations = async (req, res) => {
    try {
        const locations = await LocationModel.find();
        res.render('location', { locations });
    } catch (error) {
        res.status(500).send('Error fetching locations');
    }
};

// Hiển thị form tạo Location mới
const renderCreateLocationForm = (req, res) => {
    res.render('createLocation');
};

// Xử lý tạo Location mới
const createLocation = async (req, res) => {
    try {
        const { position, map, sdt, city } = req.body;
        const newLocation = new LocationModel({ position, map, sdt, city });
        await newLocation.save();
        res.redirect('/locations');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to create location');
    }
};

// Hiển thị form chỉnh sửa Location
const renderEditLocationForm = async (req, res) => {
    try {
        const locationId = req.params.id;
        const location = await LocationModel.findById(locationId);

        if (!location) {
            return res.status(404).send('Location not found');
        }

        res.render('editLocation', { location });
    } catch (error) {
        res.status(500).send('Error fetching location');
    }
};

// Xử lý cập nhật Location
const updateLocation = async (req, res) => {
    try {
        const locationId = req.params.id;
        const { position, map, sdt, city } = req.body;

        const updatedLocation = await LocationModel.findByIdAndUpdate(locationId, {
            position,
            map,
            sdt,
            city
        }, { new: true });

        if (!updatedLocation) {
            return res.status(404).send('Location not found');
        }

        res.redirect('/locations');
    } catch (error) {
        res.status(500).send('Error updating location');
    }
};

// Xử lý xóa Location
const deleteLocation = async (req, res) => {
    const locationId = req.params.id;

    try {
        const deletedLocation = await LocationModel.findByIdAndDelete(locationId);

        if (!deletedLocation) {
            return res.status(404).json({ message: 'Location not found' });
        }

        res.redirect('/locations');
    } catch (error) {
        res.status(500).send('Error deleting location');
    }
};

// Xóa Location bằng API (phản hồi JSON)
const deleteLocationAPI = async (req, res) => {
    const locationId = req.params.id;

    try {
        const deletedLocation = await LocationModel.findByIdAndDelete(locationId);

        if (!deletedLocation) {
            return res.status(404).json({ message: 'Location not found' });
        }

        res.status(200).json({ message: 'Location deleted successfully' });
    } catch (error) {
        res.status(500).send('Error deleting location');
    }
};

module.exports = {
    getAllLocations,
    renderCreateLocationForm,
    createLocation,
    renderEditLocationForm,
    updateLocation,
    deleteLocation,
    deleteLocationAPI
};
