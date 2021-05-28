<template>
    <div class="card p-2 my-3">
        <div class="card-body">
            <h4 class="card-title ">{{team.name}}</h4>
            <h5 class="card-title ">@{{team.shortName}}</h5>
            <div class="card-text">
                <p class="font-size">{{team.description}}</p>
                <button class="btn btn-danger" v-on:click="excuseYourself()">Excuse Yourself</button>
                <hr>
                <h6><strong>Members</strong>: <span>{{attendees}}</span></h6> 
                <form action="">
                    <select id="member" style="width:45%" name="member" class="font-size p-1" v-model="memberid">
                      <option value="member0">Select member</option>
                      <option v-for="user in allusers" :key="user._id" :value="user._id">{{user.name}}</option>                  
                    </select>
                    <button class="btn btn-primary ml-1" @click="AddToTeam($event)">Add</button>
                </form>
            </div>            
        </div>
    </div>    
</template>

<script>

import  {excuseYourSelfFromTeam } from '../services/team';
export default {
    name : 'TeamCard',
    props : {
        team : Object,
        allusers : Array
    },
    created(){
        this.memberid = "";

        var attendes = "";
        this.team.members.forEach( ele =>{
            attendes += ele.email + ', ';
        });
        this.attendees = attendes.slice(0,attendes.length-2);
    },
    methods : {
        excuseYourself() {
            excuseYourSelfFromTeam(this.team._id)
            .then( data => {
                console.log(data);
            });
        },
        AddToTeam(event)
        {
            event.preventDefault();
            if( this.memberid){
                this.$emit( 'addtoteam', { memberid : this.memberid , teamid : this.team._id} );
            }
        }
    }
}
</script>

<style scoped>

</style>