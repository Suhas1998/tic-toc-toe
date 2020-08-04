import firebase,{fauth} from "./Fire.js"

const fbFunc = {

    createUser: function(){
                    fauth().signInAnonymously().then((cred) =>{
                        // return (cred.user.uid)
                    })
                },

    currUser: function(){
                    console.log("CurreUserReferences")
                    fauth().onAuthStateChanged( function (user) {
                            if (user) {
                                console.log("2")
                            }
                            else {
                                console.log("Wasted 2");
                            }
                        });
                    
                },

    createGameRoom: function(userId){
                    var d = new Date();
                    var n = d.getTime();
                    console.log("Lets see: "+userId)
                    // fb.database().ref('gameRoom/' + n ).set({
                    //     player1: userId
                    // });

                }

}


export default fbFunc