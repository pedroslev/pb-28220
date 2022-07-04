//twilio wsp
import twilio from 'twilio';
const accountSid = 'ACab43a42c8bfe50cc060a39708b7eb173'
const authToken = '510844147c45baf9111f450a438e2fde'
const client = twilio(accountSid, authToken)

let mailingSender = (msj) => {

    try {
        client.messages.create(msj)
        return true;
    } catch (error) {
        return error;
    }

}


export{
    mailingSender,
}