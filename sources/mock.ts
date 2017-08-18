import * as moment from "moment";

import * as time from "./time";

/**
 * A Clock implementation that uses the moment (https://www.npmjs.com/package/moment) Javascript
 * library, but advances time manually.
 */
export class Clock implements time.Clock {
    constructor(private _now?: moment.Moment) {
        if (!_now) {
            this._now = moment();
        }
    }

    /**
     * Get the current local date according to this Clock.
     */
    public getLocalDate(): time.Date {
        return this.getLocalDateTime();
    }

    /**
     * Get the current local time according to this Clock.
     */
    public getLocalTime(): time.Time {
        return this.getLocalDateTime();
    }

    /**
     * Get the current local date and time according to this Clock.
     */
    public getLocalDateTime(): time.DateTime {
        return new time.MomentDateTime(this._now);
    }

    /**
     * Get the current UTC date according to this Clock.
     */
    public getUTCDate(): time.Date {
        return this.getUTCDateTime();
    }

    /**
     * Get the current UTC time according to this Clock.
     */
    public getUTCTime(): time.Time {
        return this.getUTCDateTime();
    }

    /**
     * Get the current UTC date and time according to this Clock.
     */
    public getUTCDateTime(): time.DateTime {
        return new time.MomentDateTime(this._now.utc());
    }
}