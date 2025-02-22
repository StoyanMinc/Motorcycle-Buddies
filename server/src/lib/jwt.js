
import jsonWebToken from 'jsonwebtoken';
import util from 'util';

const jwt = {
    assyncSign: util.promisify(jsonWebToken.sign),
    assyncVerify: util.promisify(jsonWebToken.verify)

}

export default jwt;