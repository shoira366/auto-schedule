import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/errorhandler";

const errorhandler = (
	err: CustomError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.status(err.status).json(err.getError())
};

export default errorhandler;
