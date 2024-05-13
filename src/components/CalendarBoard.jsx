import { Calendar } from "antd";

const CalendarBoard = () => {
    return (
        <div className="calendar-wrapper">
            <div className="calendar-left">
                <Calendar cellRender={cellRender} />
            </div>
            <div className="calendar-right"></div>
        </div>
    );
};

export default CalendarBoard;
