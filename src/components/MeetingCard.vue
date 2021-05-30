<template>
    <div class="card w-100 text-left mt-3 mb-3">
        <div class="card-body"> 
            <h5 class="card-title font-weight-bold">{{date}}<span class="font-weight-bold ml-1" style="font-size:1rem;"> {{starth}}:{{startm}} - {{endh}}:{{endm}} </span></h5>
            <h6 class="card-subtitle mb-2 font-weight-bold" style="font-size:0.9rem;">{{meetingname}}</h6>
            <button type="button" class="btn btn-danger" v-on:click="excuseYourself()">Excuse Yourself</button><hr>
            <h6 class="card-subtitle mb-2 font-weight-bold">Attendees : {{attendees}}</h6>
            <select id="attendeestoadd" style="width:15%" class="border p-2 mr-1" name="attendeestoadd" v-model="memberid">
                <option value="member0">Select member</option>
                <option v-for="user in users" :key="user._id" :value="user._id">{{user.name}}</option>
            </select>
            <button type="submit" class="btn btn-primary ml-2" @click="AddToMeeting($event)">Add</button>
        </div>
    </div>
</template>

<script>

import { format } from 'date-fns';
export default {
    name : 'MeetingCard',
    props : {
            meetingdetail: {
                type: Object,
                required: true
            },
            users : Array
    },
    created : function() {       
        this.date = format(new Date(this.meetingdetail.date), "dd MMMM yyyy");
        this.starth = String( this.meetingdetail.startTime.hours);
        this.startm = String( this.meetingdetail.startTime.minutes) ;
        this.endh = String( this.meetingdetail.endTime.hours);
        this.endm = String( this.meetingdetail.endTime.minutes);
        if( this.meetingdetail.startTime.hours < 10 ){
            this.starth = '0' + this.starth;
        }
        if( this.meetingdetail.startTime.minutes < 10 ){
            this.startm = '0' + this.startm;
        }
        if( this.meetingdetail.endTime.hours < 10 ){
            this.endh = '0' + this.endh;
        }
        if( this.meetingdetail.endTime.minutes < 10 ){
            this.endm = '0' + this.endm;
        }
        var attendes = "";
        this.meetingdetail.attendees.forEach( ele =>{
            attendes += ele.email + ', ';
        });
        this.attendees = attendes.slice(0,attendes.length-2);
        this.meetingname = this.meetingdetail.name;

        this.memberid = "";
    },
    methods : {
        excuseYourself(){
            if( this.meetingdetail._id ){
                console.log("Excuse your self from meeting")
                this.$emit( 'excuseyour', this.meetingdetail._id );
            }
        },
        AddToMeeting(event)
        {
            event.preventDefault();
            console.log(this.meetingdetail);
            if( this.memberid){
                console.log("meeting add user to meeting")
                this.$emit( 'addtomeeting', { memberid : this.memberid , meetingid : this.meetingdetail._id} );
            }
        }
    }
}
</script>

<style scoped>

</style>