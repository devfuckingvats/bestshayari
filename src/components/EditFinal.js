import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'

class EditFinal extends Component {

    handleDelete = e => {
        console.log(this.props.relatedTags);
        this.props.relatedTags.forEach((tag, i) => {
            var ref = firebase.firestore().collection('tags').doc(tag).collection('shayaris').where('title', '==' , this.props.title);
            ref.get()
            .then(snap => {
                snap.forEach(doc => {
                    doc.ref.delete()
                    .then(() => {
                        firebase.firestore().collection('tags').doc(tag).update({
                            totalShayaris: firebase.firestore.FieldValue.increment(-1)
                        })
                        .then(() => {
                            if(i === this.props.relatedTags.length-1){
                                this.props.closeEditing()
                            }
                        })
                    })
                    .catch(err => {
                        alert(err.message)
                    })
                })
            })
        })
    }

    render() {
        const { title, content, relatedTags } = this.props;
        return (
            <div>
                <div id='editTitle'>{title}</div>
                <div id='editContent'>{content}</div>
                <div>{relatedTags.join(', ')}</div>
                <button onClick={e => this.handleDelete(e)}>Delete</button>
            </div>
        )

    }
}

export default EditFinal