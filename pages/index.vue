<template>
    <div>
       
    </div>
</template>

<script>

export default {
    middleware: "authenticated",
    mounted(){
        this.$store.dispatch("readToken");
        $nuxt.$router.push("/dashboard");
    },
}
</script>
