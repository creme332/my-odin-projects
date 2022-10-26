import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { format } from 'date-fns';

/**
 * Controls everything related to calendar view.
 */
export const calendarFactory = (() => {
    const calendarEl = document.getElementById('calendar');
    const switchToCalendarBtn = document.querySelector('#calendar-view-btn');

    function getButton() {
        return switchToCalendarBtn;
    }
    /**
     * Converts `tasksArray` into a an array of JSON which can then be used with fullCalendar.
     * @param {[Task]} tasksArray 
     * @returns {[JSON]} `eventList`
     */
    function parseEvents(tasksArray) {
        let eventList = [];
        for (let task of tasksArray) {
            let obj = {
                "title": task.title,
                "start": format(task.duedate, "yyyy-MM-dd"),
                "classNames": [],
            };
            if (task.getPriorityIndex() == 0) {
                obj.classNames = ['high-priority'];
            }
            if (task.getPriorityIndex() == 1) {
                obj.classNames = ['medium-priority'];
            }
            if (task.getPriorityIndex() == 2) {
                obj.classNames = ['low-priority'];
            }
            eventList.push(obj);
        }
        console.log(eventList);
        return eventList;
    }

    function renderCalendar(tasksArray) {
        const calendar = new Calendar(calendarEl, {
            plugins: [dayGridPlugin],
            initialDate: new Date(),
            navLinks: true, // can click day/week names to navigate views
            editable: true,
            dayMaxEvents: true, // allow "more" link when too many events
            events: parseEvents(tasksArray)
        });

        calendar.render();
    }
    return { renderCalendar, getButton };
})();

