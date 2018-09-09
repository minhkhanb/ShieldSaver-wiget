const guid = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
const getGUID = () => `${guid()}${guid()}-${guid()}-4${guid().substr(0, 3)}-${guid()}-${guid()}${guid()}${guid()}`.toLowerCase();

const StringHelpers = {
	getGUID,
};

export default StringHelpers;