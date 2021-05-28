<template>
    <div class="container">    
        <h2 class="text-left font-weight-bold">Meeting</h2><hr>
        <!-- navbar -->
        <nav class="navbar navbar-expand navbar-light bg-light">
            <ul class="nav navbar-nav">
                <li class="nav-item ">
                    <a class="nav-btn" :class="{ activee : toggleFilterAdd}" v-on:click="SetToggleFilterAddTrue()">Filter/Search Meeting</a>
                </li>
                <li class="nav-item">
                    <a class="nav-btn" :class="{ activee : !toggleFilterAdd}" v-on:click="SetToggleFilterAddFalse()">Add meeting</a>
                </li>
            </ul>
        </nav>

        <!-- Filter -->
        <div v-if="toggleFilterAdd" class="search-meeting text-left p-4">
            <h3 style="color: white;">Search for meeting</h3><hr>
            <form action="" v-on:submit="searchMeeting($event)">
                <div class="mar"><label for="Date" class="font-weight-bold">Date</label></div>
                <select id="day" class="border w-100 p-2 mb-1" name="day" v-model="period"> 
                    <option value="all" selected >ALL</option>
                    <option value="past" >PAST</option>
                    <option value="present">TODAY</option>
                    <option value="future">UPCOMING</option>
                </select>

                <div class="mar"><label for="search" class="font-weight-bold">Description</label></div>
                <div class="mar"><textarea v-model="descriptionForSearch" name="descriptionForSearch" id="descriptionForSearch" class="border w-100" cols="30" rows="3" placeholder="Search using words which describe the meeting"></textarea></div>
                <button type="submit" class="btn btn-primary">Search</button>
            </form>
        </div> 

        <!-- Add Meeting -->
        <div v-if="!toggleFilterAdd" class="search-meeting text-left p-4">
            <h3 style="color: white;">Add a new meeting</h3><hr>
            <form action="" v-on:submit="onClickButton($event)">
                <div class="mar"><label for="Date">Date</label></div>
                <input type="date" v-model="formdate" class="font-size date-btn w-100 border"> {{formdate}}

                <div class="mar"><label for="starthour">Start time (hh:mm)</label></div>
                <select id="startTime1" class="border" name="starthour" v-model="starthour"> {{starthour}}
                    <option value="0" >0</option>
                    <option value="1" >1</option>
                    <option value="2" >2</option>
                    <option value="3" >3</option>
                </select>
                {{starthour}}
                <strong> : </strong>
                <select id="startminutes" class="border" name="startminutes" v-model="startminutes">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                {{startminutes}}
                <div class="mar"><label for="endTime">End time (hh:mm)</label></div>
                <select id="endhour" class="border" name="endhour" v-model="endhour">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                {{endhour}}
                <strong> : </strong>
                <select id="endminutes" class="border" name="endminutes" v-model="endminutes">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                {{endminutes}}
                <div class="mar"><label for="search">Description</label></div>
                <div class="mar"><input type="text" class="search-btn w-100 border pl-2" placeholder="What is agenda of the meeting?" v-model="description"></div>
                <div class="mar"><label for="emailAttendees">Email ID's of attendees, or team's short</label></div>
                <div class="mar"><input type="text" class="search-btn w-100 border pl-2 mb-3" placeholder="john@example.com, @annual-day, mark@example.com" v-model="emailattendees"></div>
                <button type="submit" class="btn btn-primary" >Add meeting</button>
                {{description}}
                {{emailattendees}}
            </form>
        </div> 

        <h3 class="text-left font-weight-bold mt-4 mb-4">Meeting matching search criteria</h3>   
        
        <!-- meeting cards -->
        <div class="containermeeting" v-for="meetingdetail in meetingdetaillist" :key="meetingdetail._id"> 
            <MeetingCard :meetingdetail="meetingdetail" :users="allusers" v-on:addtomeeting="addUserToMeeting($event)" />
        </div>     
    </div>  
</template>

<script>

import { format } from 'date-fns';
import { searchMeetingDateWord , getAllUsers, AddToMeeting} from '../services/meeting'
import MeetingCard from './MeetingCard';
export default {
    name : 'Meeting',
    components : {
        MeetingCard
    },
    data(){
        return {
            formdate : format(new Date(), 'yyyy-MM-dd'),
            starthour : 0,
            startminutes : 0,
            endhour : 0,
            endminutes : 0,
            description : "",
            emailattendees : "",
            toggleFilterAdd : true,
            period : "all",
            descriptionForSearch : "",
            meetingdetaillist : null,
            allusers : []
        }
    },
    created : function() {        
        searchMeetingDateWord(this.descriptionForSearch , this.period)
        .then(x =>{
            this.meetingdetaillist = x;
        });
        console.log(this.meetingdetaillist);

        getAllUsers()
        .then( alluser =>{
            // console.log(alluser);
            this.allusers = alluser;
        });
    },
    methods : {
        onClickButton(event){
            event.preventDefault();
            console.log(event);
        },
        SetToggleFilterAddFalse()
        {   
            this.toggleFilterAdd = false;
        },
        SetToggleFilterAddTrue()
        {
            this.toggleFilterAdd = true;    
        },
        searchMeeting(event){
            event.preventDefault();
            console.log(event);

            searchMeetingDateWord(this.descriptionForSearch , this.period)
            .then(x =>{
                this.meetingdetaillist = x;
            });
        },
        addUserToMeeting(event)
        {
            console.log(event);
            AddToMeeting(event.memberid, event.meetingid)
            .then( data =>{
                console.log(data);
            })
        }
    }
}
</script>

<style scoped>
.active{
    background-color : imp blue;
}
.search-meeting{
    background-color: rgb(42, 210, 216);
}
.nav-btn{
    color: lightgrey;
    text-decoration: none ;
    padding: 3px;
}
.activee{
    color : rgb(27, 139, 143);
}
</style>