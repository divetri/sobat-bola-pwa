var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BPGL9uN_vUfsrDgjnI77z_yMoa8iiwnI7yaLHVuSQ7qBVbMgnrzNauLtpGSnRutp1qSzXT4QarkhcxEriB2Jp3I",
   "privateKey": "RBavi8ww4TiVkMYAWZ8_V91pyotwBpZSwlMJMRzSL78"
};
 
 
webPush.setVapidDetails(
   'mailto:divetrirahmawati@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/eE1La7elaRs:APA91bGJQPb4qwvDkrzxfHCHrbIDYFp6TF5B6P7Ma2AsBzKAVMYB4Di8rBsOpRvH1lDC9tcskelYtcVDSFsZLifuad7rXztrdYNBsS0ti08SH4jDw5KTqN6CznyobPVSTFAGlwevfmv1",
   "keys": {
       "p256dh": "BFWKYjPVdzfxb1c5gOeDv5+zZah8fWUwKOpX7V5ii/pzKstQjwrGxEzIl3tmtjF21Am0nJ9ZEyLCY3l8lUf2+dA=",
       "auth": "UP2OZRnCphIvwjE2NsUHlA=="
   }
};
var payload = 'Welcome';
 
var options = {
   gcmAPIKey: '788172289693',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);