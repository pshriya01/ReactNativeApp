import React, { useEffect, useRef } from 'react'
import { Alert, Image, PermissionsAndroid, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ViewShot from "react-native-view-shot";
import RNHTMLtoPDF from "react-native-html-to-pdf";

const ProfileScreen = (props) => {

    const viewShotRef = useRef();

    const { profile } = props?.route?.params || {}
    console.log({ profile })

    const requestStoragePermission = async () => {
        if (Platform.OS === "android") {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: "Storage Permission Required",
                message: "This app needs access to your storage to download the PDF",
                buttonPositive: "Allow",
              }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
          } catch (error) {
            console.warn(error);
            return false;
          }
        }
        return true; 
      };

    const handleDownloadProfile = async () => {
        const hasPermission = await requestStoragePermission();
        if (!hasPermission) {
          Alert.alert("Permission Denied", "Storage permission is required to save the PDF.");
          return;
        }
    
        try {
        
          const uri = await viewShotRef.current.capture();
          const htmlContent = `
            <html>
              <body style="text-align: center;">
                <img src="${uri}" style="width: 100%; height: auto;" />
              </body>
            </html>
          `;
    
          const options = {
            html: htmlContent,
            fileName: "Profile",
            directory: "Documents",
          };
    
          const file = await RNHTMLtoPDF.convert(options);
    
          Alert.alert("Download Complete", `PDF saved to: ${file.filePath}`);
        } catch (error) {
          console.error("Error creating PDF:", error);
        }
      };

      useEffect(()=>{
       const name = `${profile.name.first} ${profile.name.last}`
       console.log(name,'name')
       props.navigation.setOptions({headerTitle:name})
      },[props.navigation])


    return (
        <View>
            <ViewShot ref={viewShotRef} options={{ format: "jpg", quality: 0.9 }}>
                <View style={[styles.container]} >
                    <Image style={[styles.profilePicture]} source={{ uri: profile.picture.large }} ></Image>
                    <View style={[styles.age]} >
                        <Text>{profile.registered.age}</Text>
                    </View>
                </View>
                <View style={[styles.profileview]} >
                    <Text style={[styles.text]} >Email: {profile.email}</Text>
                    <Text style={[styles.text]}  >
                        Date Joined:  {new Date(profile.registered.date).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </Text>
                    <Text style={[styles.text]} >DOB:{new Date(profile.dob.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })} </Text>
                </View>
                <View style={[styles.profileview]} >
                    <Text style={[styles.text]} >Location</Text>
                    <Text style={[styles.text]} >City: {profile.location.city}</Text>
                    <Text style={[styles.text]} >State: {profile.location.state}</Text>
                    <Text style={[styles.text]} >Country: {profile.location.country}</Text>
                    <Text style={[styles.text]} >Postcode: {profile.location.postcode}</Text>
                </View>
            </ViewShot>
            <View style={[styles.downloadButton]} >
                <TouchableOpacity style={[styles.button]} onPress={handleDownloadProfile} >
                    <Text style={{color:'white',fontWeight:600}} >Download Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    profilePicture: {
        width: 200,
        height: 200
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20
    },
    profileview:{
        marginHorizontal:30,
        borderTopWidth:1,
        paddingVertical:20
    },
    text:{
        marginBottom:10,
        fontSize:16,
        fontWeight:500

    },
    downloadButton:{
        justifyContent:'center',
        alignItems:'center'
    },
    button:{
        paddingVertical:10,
        paddingHorizontal:20,
        borderWidth:1,
        borderRadius:10,
        backgroundColor:'black'
    },
    age:{
        borderWidth:1,
        padding:5,
        position:'absolute',
        bottom:'10%',
        left:'70%',
        transform:[{rotate:'45deg'}]
    }
})

export default ProfileScreen
