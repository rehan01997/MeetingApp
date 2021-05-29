<template>
    <div class="boxcalendar" :style="{top:`${topposition}` , height:`${height}`, position: `absolute`}">
        <p class="tab-font text-left" style="font-weight: bold; font-size: 11px; margin:0px" >NAME : {{meetingname}}</p>
        <p class="tab-font text-left" style="font-size: 11px; margin:0px"><strong>Attendees</strong> : {{attendees}}</p>
    </div>
</template>

<script>
export default {
    name: 'calenderCard',
    props : {
        meetingname : String,
        attendees : String,
        topposition : String,
        height : String
    }
}
</script>

<style scoped>
.boxcalender{
    background-color: lightgrey;
    left:48px;
    width:94%
}
</style>