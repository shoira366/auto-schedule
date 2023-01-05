import { sign, verify } from "jsonwebtoken";
import SECRET_KEY from "../../config";

const signUser = (payload: Object) => sign(payload, SECRET_KEY);
const verifyUser = (token: string) => verify(token, SECRET_KEY);

export { signUser, verifyUser };
