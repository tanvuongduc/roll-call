import { CustomerNS } from "../customer/customer";
import { LocationNS } from "../location/location";
import { OrgNS } from "../org/org";
import { HttpError, HttpStatusCodes } from "../lib/http";


const commonErrors = new Set([
    ...Object.values(CustomerNS.Errors),
    ...Object.values(LocationNS.Errors),
    ...Object.values(OrgNS.Errors),
]);

export function HttpErrorHandler(err, req, res, next) {
    if (commonErrors.has(err)) {
        err = new HttpError(err.message, HttpStatusCodes.BadRequest);
    }
    if (err && typeof err.HttpStatusCode === "function") {
        const message = err.message;
        res.status(err.HttpStatusCode() || 500).json({
            error: message,
        });
        return;
    }
    console.log(err);
    res.status(500).send({
        error: "internal server error",
    });
}