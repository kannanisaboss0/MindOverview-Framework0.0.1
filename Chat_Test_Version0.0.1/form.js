class Form{

    constructor(){
        this.input=createInput("UserName")
        this.heading=createElement('h1')
        this.greeting=createElement('h2')
        this.login=createButton('Login')
        this.teacher=createButton('Expert')
        this.pupil=createButton('Student')
        this.choice=createElement('h2')
        this.type=null
        this.name=null
        this.mathtext=null
        
        
        this.userTracker=1
        this.reset=createButton('ResetInfo')
        this.MathsButton=createButton('Maths')
      
        this.subjectChoose=createElement('h1')
      
        this.in="Noneurrently"
        this.index=0
        this.PlOnline=createElement('h3')
        this.Mathsender=createButton('Send Message(Click once to acivate sender and change input value once too)')
        this.textMathPosX=0
        this.textMathPosY=100
        this.textInputMath=createInput("Type Your Message")
       
        this.userStore=[]
        
        this.mathIn=createElement('h3')
        
        
    }
    display(){
      
        this.heading.html("Mind Overview ChatBox Test Version0.0.1")
        this.heading.position(600,0)
        this.greeting.html('Welcome! You are one of the few to recieve the Chat box Test Version 0.0.1 Vcs Type Program')
        this.greeting.position(400,400)
        this.input.position(750,500)
        this.choice.html("Are you:"+this.type)
        this.PlOnline.html('Users currently active(Still in progress):'+''+this.userCount)
        this.PlOnline.position(1400,150)
        this.choice.position(400,500)
        this.pupil.position(400,550)
        this.teacher.position(400,600)
        
         this.mathIn.position(1400,250)
       
        this.name=this.input.value();
        this.pupil.mousePressed(()=>{
            this.login.position(750,600)
            this.type="student"
        })
        
       
        this.teacher.mousePressed(()=>{
            this.login.position(750,600)
            this.type="expert"
        })
        var CountRef=db.ref('GlobalUserData/NoofPlayersOnline')
        CountRef.on("value",(data)=>{
            this.userCount=data.val();
        })
      
        
        this.login.mousePressed( ()=>{
            
           this.userCount=this.userCount+1;
            this.PlOnline.position(1700,100)
            this.userStore.push(this.name)
           
          
          
           
            
            var userData='Users/UserInfo/User'+this.userCount;
            db.ref(userData).set({
                    name:this.name,
                    type:this.type,
                 
                    recenttexts:this.mathtext,
                    

                    
                    
            })
            var userTrack='GlobalUserData';
            db.ref(userTrack).set({
                NoofPlayersOnline:this.userCount
            })
            this.heading.hide();
            this.greeting.hide();
            this.teacher.hide();
            this.pupil.hide();
            this.choice.hide();
            this.input.hide();
            this.login.hide();
            this.subjectChoose.html("Which subject?(This is a test version. No decorations and additional subjects,other than the ones present below should be expected)")
            this.subjectChoose.position(30,75)
            
            this.MathsButton.position(600,150)
            
            
        })
       
        
       
        this.MathsButton.mousePressed(()=>{
            this.mathCount=0
            this.mathCount=this.mathCount+1
            
             
        
        
         
            

            this.subjectChoose.hide();
            this.MathsButton.hide();
            
            
           
            this.Mathsender.position(50,400)
            
            this.textInputMath.position(200,200)
            this.PlOnline.hide();
           
        })
        this.mathtext=this.textInputMath.value()
        this.Mathsender.mousePressed(()=>{
            this.textMathPosX=this.textMathPosX+100
            this.textMathPosY=this.textMathPosY+200
            this.text=createElement('h3')
            this.text.html(this.name+":"+this.mathtext)
            this.text.position(500,this.textMathPosX)
            this.recieve=this.mathtext
            var TextData='TextUpdates/Users'
            db.ref(TextData).set({
                name:this.name,
                recenttexts:this.mathtext,
                distance:this.textMathPosY
                
            })
           
           
            
            var idRef=db.ref('TextUpdates/Users/distance')
            idRef.on("value",(data)=>{
                this.dist=data.val();
            })
         var TextRef=db.ref('TextUpdates/Users/recenttexts')
            TextRef.on("value",(data)=>{
               data.val();
               this.nom=0
               
                this.TextReciever=createButton(this.name+":"+data.val())
                
            this.TextReciever.position(800,this.dist)
            })
        })
      
        
    }
   
}