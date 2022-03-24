const isPalindrome = (word) =>{
    return word.split("").reverse().join("").toLowerCase() === word.toLowerCase();
}

// item controller

const ItemCtrl = (function(){
    const Entry = function(word, guess){
        this.id = data.entries.length + 1;
        this.word = word;
        this.guess = guess;
        this.answer = isPalindrome(word);
    }

    const data = {
        entries: []
    }

    return{
        getEntries: function (){
            return data.entries
        },
        addEntry: function (word, guess){
            newEntry = new Entry(word, guess);
            data.entries.push(newEntry);
            return newEntry
        },
    }
})();


// ui controller

const UICtrl = (function(){
    const UISelectors = {
        table: '#entryTableBody',
        entryWord: '#entryWord',
        entryGuess: '#entryGuess',
        addBtn: '.add-btn',
    }
    return{
        populateTable: function (items){
            let html = "";
            let greenCell = "background-color: #43a047";
            let redCell = "background-color: #e53935";
            items.forEach(function (entry){
                html += `<tr>
                            <td>${entry.id}</td>
                            <td><p>${entry.word}</p></td>
                            <td style="${entry.answer === entry.guess ? greenCell : redCell}"><div>You guessed: <span>${entry.guess}</span></div><div>Answer is: <span>${entry.answer}</span></div></td>
                        </tr>`;
            })
            document.querySelector(UISelectors.table).innerHTML = html;
        },
        getSelectors: function (){
            return UISelectors;
        },
        getEntryInput: function (){
            return{
                word: document.querySelector(UISelectors.entryWord).value,
                guess: document.querySelector(UISelectors.entryGuess).checked
            }
        },
        cleaInput: function (){
            document.querySelector(UISelectors.entryWord).value = "";
            document.querySelector(UISelectors.entryGuess).checked = false;
        },

    }
})();

//app controller

const App = (function(ItemCtrl, UICtrl){
    const loadEventListeners = function (){
        const UISelectors = UICtrl.getSelectors();
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemEntrySubmit);
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.tooltipped');
            var instances = M.Tooltip.init(elems);
        });
    }
    const loadTestData = function (){
        let testData = [{word: 'anna', guess:true}, {word: 'Anna', guess:true}, {word: 'anna', guess:true}, {word: 'YellowSubmarine', guess:false}];
        testData.forEach(entry =>{
            ItemCtrl.addEntry(entry.word, entry.guess);
        })
        UICtrl.populateTable(ItemCtrl.getEntries());
    }
    const itemEntrySubmit = function (event){
        const input = UICtrl.getEntryInput();
        if(input.word !== ""){
            ItemCtrl.addEntry(input.word, input.guess);
            UICtrl.populateTable(ItemCtrl.getEntries());
            UICtrl.cleaInput();
        }
    }
    return{
        init: function (){
            loadTestData();
            const entries = ItemCtrl.getEntries();
            UICtrl.populateTable(entries);
            loadEventListeners();
        }
    }
})(ItemCtrl, UICtrl);

// Init. app
App.init();