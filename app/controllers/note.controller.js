const db = require("../models");
const Note = db.notes;
const Op = db.Sequelize.Op;

exports.create = (req,res)=>{
    const title =req.body.title;  
    const description =req.body.description;
    if(!title || !description){
        res.status(400).send({message:"content can not be empty"});
        return;
    }
    const note ={title:req.body.title,
        description:req.body.description};
    Note.create(note).then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({message:err.message});
    });
};

exports.findAll =(req,res)=>{

    const note =Note.findAll()
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message});
    });
};

exports.update =(req,res)=>{
    const id =req.params.id;
    Note.update(req.body,{where:{id:id}})
    .then(num=>{
        if(num==1){
            res.send({message:"Note updated successfully"});
        } else{
            res.send({message:`cannot update note`});
        }
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message});
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Note.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Tutorial with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
  };

// exports.findOne = (req,res)=>{
//     const title =req.body.title;
//     Note.findByPk({title:title})
//     .then(data=>{
//         if(data){
//             res.send(data);
//         }else{
//             res.status(400).send({message:err.message});
//         }
//     })
//     .catch(err=>{
//         res.status(500).send({message:err.message});
//     });
// };

exports.delete = (req,res)=>{
    const id =req.params.id;
    Note.destroy({where:{id:id}})
    .then(data=>{
        if(data==1){
            res.send({message:"Note successfully deleted"});
        }else{
            res.send({message:`cannot delete note`});
        }
    })
    .catch(err=>{
        res.status(500).send({message:err.message});
    });
};
