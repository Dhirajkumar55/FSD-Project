


function Singlepost(props){
    return (
        <div>
            <a href={`http://localhost:3000/post/${props.id}`}>Title:{props.title}</a>
            <div>Goal:{props.goal}</div>
            <div>Description:{props.description}</div>
            <div>Total Members:{props.membercount}</div>
            <div>Skills:{props.skills}</div>
            <div>Duration(in weeks):{props.duration}</div>
        </div>
    )
}

export default Singlepost;