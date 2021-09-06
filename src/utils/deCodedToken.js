import jwt from 'jsonwebtoken';

export const deCodedToken = token => {
    return jwt.decode(token, {complete : true})
}