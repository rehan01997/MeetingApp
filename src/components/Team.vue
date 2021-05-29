<template>
    <div class="text-left">
        <h3 class="font-weight-bold">Teams</h3><hr>
        <h5 class="text-secondary">View and edit teams you are part of</h5>
        <div class=" row">
            <div class="col-12 col-lg-4" v-for="team in teamallcards" :key="team._id">
                <TeamCard :team="team" :allusers="allusers" v-on:addtoteam="addUserToTeam($event)"/>
            </div>
            <div class="col-12 col-lg-4">
                <button class="addbutton">+</button>
            </div>
        </div>
    </div>
</template>

<script>
import { getAllTeams, Addtoteam } from '../services/team';
import { getAllUsers } from '../services/meeting'; 
import TeamCard from './TeamCard';

export default {
    name : 'Team',
    components : {
        TeamCard
    },
    data : () => {
        return {
            teamallcards : [],
            allusers : []
        }
    },
    created()
    {
        getAllTeams()
        .then( data => {
            this.teamallcards = data
            console.log(data);
        });

        getAllUsers()
        .then( data => {
            this.allusers = data;
            // console.log(data);
        });
    },
    methods : {
        addUserToTeam(event){
            console.log(event.teamid);
            console.log(event.memberid);
            console.log("Remove from team");

            Addtoteam(event.memberid, event.teamid)
            .then(data => {
                console.log(data);
            });
            
            getAllTeams()
            .then( data => {
                this.teamallcards = data
                console.log(data);
            });
        }
    }
}
</script>

<style scoped>
.addbutton{
    height:332px;
    width:346px;
    margin:0px;
    margin-top: 16px;
    padding:8px;
    border: 1px solid lightgrey;
}
</style>