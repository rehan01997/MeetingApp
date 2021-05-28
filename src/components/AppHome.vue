<template>
    <div class="container">
        <h2 class="text-left font-weight-bold">Calender</h2>
        <hr />
        <div class="d-flex justify-content-between">
            <div>
                <h4>{{date}}</h4>
                <div class="text-left">{{day}}</div>
            </div>
            <div>
                <input type="date" name="current-date" id="current-date" v-model="searchdate" v-on:change="onsubmit(searchdate)">
            </div>
        </div>    

        <div class="calendarr">
            <div class="calblock m-1 row" v-for="hour in 24" :key="hour">
                <div class="col-md-auto" style="width:40px">{{hour}}</div>
                <div class="col calblockfield">
                </div>
            </div>
            <!-- meeting scheduled div -->
            <calenderCard v-for="calcards in calendercards" :meetingname="calcards.meetingname" :attendees="calcards.attendees" :topposition="calcards.topposition" :height="calcards.height" :key="calcards.name"/>
        </div>

    </div>
</template>

<script>
import { format } from 'date-fns';
import { fetchCalender } from '../services/calender';
import calenderCard from './CalenderCard';

const HEIGHT_HOUR_BOX = 30, MARGIN_HOUR_BOXES = 4;

export default {
    name: 'AppHome', 
    components : {
        calenderCard
    },
    data() {
            return {
                status: 'LOADING',  
                searchdate : format(new Date(), 'yyyy-MM-dd'),
                error: null,
                calendercards : []
            }
        },
        created : function()  {
            this.day = format(new Date(), "eeee");
            this.date = format(new Date(this.searchdate), "dd MMMM yyyy");
            fetchCalender(this.searchdate)
            .then(data => {                  
                    data.forEach(element => {
                        var eleheight = this.getHeight( element.startTime.hours , element.startTime.minutes , element.endTime.hours , element.endTime.minutes );
                        var position = this.getPosition( element.startTime.hours , element.startTime.minutes );
                        var attendes = this.getAttendees( element );
                        
                        this.calendercards.push({
                            'meetingname' : element.name,
                            'attendees' : attendes,
                            'topposition' : position.top,
                            'height' : eleheight.height 
                        });
                    });
            });  
        },
        methods : {
            onsubmit(event)
            {   
                this.day = format(new Date(event), "eeee");
                this.date = format(new Date(event), "dd MMMM yyyy");
                this.calendercards = [];
                fetchCalender(event)
                .then(data => {                    
                    data.forEach(element => {
                        var eleheight = this.getHeight( element.startTime.hours , element.startTime.minutes , element.endTime.hours , element.endTime.minutes );
                        var position = this.getPosition( element.startTime.hours , element.startTime.minutes );
                        var attendes = this.getAttendees( element );
                        
                        this.calendercards.push({
                            'meetingname' : element.name,
                            'attendees' : attendes,
                            'topposition' : position.top,
                            'height' : eleheight.height 
                        });
                    });
                });
            },
            getHeight( startHour, startMinute, endHour, endMinute ) {    
                const totalMinutes = ( endHour - startHour ) * 60 + ( endMinute - startMinute );
                return {
                    height: totalMinutes * HEIGHT_HOUR_BOX / 60 + ( endHour - startHour ) * MARGIN_HOUR_BOXES + 'px'
                };
            },
            getPosition( startHour, startMinute ) {
                const minutesFromStartOfDay = startHour * 60 + startMinute;
                return {
                    top: minutesFromStartOfDay * HEIGHT_HOUR_BOX / 60 + startHour * MARGIN_HOUR_BOXES + 'px',
                    left: '50px',
                    right: '10px'
                };
            },
            getAttendees( element ){
                var attendees = "";
                element.attendees.forEach( x =>{
                    attendees += x.email + ', ';
                });
                return attendees = attendees.slice(0,attendees.length-2);
            }       
        }
}
</script>

<style scoped>
    .calendarr{
        position: relative ;
    }
    .boxcalendar{
        position : absolute;
        background-color: lightgrey;
        left:48px; 
        width:94%;
    }
    .calblock{
        height: 34px;
    }
    .calblockfield{
        background-color: rgb(42, 210, 216);
    }
    .tab-font{
        padding : 0 0 0 3px;
        margin: 0;
        font-size: 11px;
    }
</style>