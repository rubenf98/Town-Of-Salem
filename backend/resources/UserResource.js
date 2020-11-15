exports.UserResource = { singleUser };

function singleUser(record) {
    return {
        _id: record._id,
        username: record.username,
        email: record.email,
    }
}