const _ = require('lodash');
mongoose = require('mongoose');
cardModel = require('./card.model');
listModel = require('../list/list.model');

// POST
exports.createCard = function(req, res, next) {

	const {title, description,dueDate, list, position} = req.body;
	const newCard = new cardModel({
		title:title,
		description:description,
		dueDate,
		list,
    position
	});

	newCard.save().then(card=>{
		listModel.findByIdAndUpdate(list,{ $push:{cards: card._id }})
			.then(list=>{
			return res.status(201).json(card);
		});
	});
};

exports.editCard = function(req, res ,next) {
	const cardId = req.params.id;
	const {title, description,dueDate, list, position} = req.body;
	const updateObject = {
		title,
		description,
		dueDate,
		list,
		position
	}
	cardModel
		.findByIdAndUpdate(cardId, { $set: updateObject }, function(err, card) {
			if(err) {
				return res.status(400).json({ message: 'Unable to update card', error: err });
			}

			res.json({ message: 'card successfully updated', card: card });
		});
};

exports.transferCard = function(req, res ,next) {
	const cardId = req.params.id;
	const card = req.body.card;
	const sourceList = req.body.from;
	const targetList = req.body.to;

	cardModel
		.findByIdAndUpdate({ _id: cardId }, { $set: card }, function(err, card) {
			if(err) {
				return res.status(400).json({ message: 'unable to update card', error: err });
			}

			return Promise.all([
				listModel.findByIdAndUpdate({ _id: sourceList }, { $pull: { cards: cardId }}).exec(),
				listModel.findByIdAndUpdate({ _id: targetList }, { $push: { cards: cardId }}).exec()
			]).then(
				(list) => {
					return res.json({ message: 'card successfully updated', list: list })
				},
				(err) => {
					return res.status(400).json({ message: 'unable to update refs', error: err })
				}
			);

		});
};

exports.removeCard = function (req, res) {
    cardModel
        .findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.json({ message: 'impossible to remove the card', error: err });
            };

            res.json({ message: 'card removed successfully' });
        });
};
