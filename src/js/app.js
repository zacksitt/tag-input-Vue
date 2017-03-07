Vue.component('autocomplete-input', {
  template: '#autocomplete-input-template',
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isOpen: false,
      highlightedPosition: 0,
      keyword: ''
    }
  },
  computed: {
    fOptions() {
      const re = new RegExp(this.keyword, 'i')
      return this.options.filter(o => o.title.match(re))
    }
  },
  methods: {
    onInput(value) {
        this.highlightedPosition = 0
        this.isOpen = !!value
      },
      moveDown() {
        if (!this.isOpen) {
          return
        }
        this.highlightedPosition =
          (this.highlightedPosition + 1) % this.fOptions.length
      },
      moveUp() {
        if (!this.isOpen) {
          return
        }
        this.highlightedPosition = this.highlightedPosition - 1 < 0 ? this.fOptions.length - 1 : this.highlightedPosition - 1
      },
      select() {
        var selectedOption = this.fOptions[this.highlightedPosition];
        // check for new tag
        if(!selectedOption){
            selectedOption = {'tag_id':0,'title':this.keyword,'description':''};
        }
        this.$emit('select', selectedOption)
        this.isOpen = false
        // this.keyword = selectedOption.title
        this.keyword = "";
      }
  }
})
var app = new Vue({
  el:'#tagApp',
  data:{
    selected_tags:[],
    options: [
      {'tag_id':1,'title':"vusJS","description":"Javascript framework"},
      {'tag_id':2,'title':"CI","description":"PHP framewok"},
      {'tag_id':3,'title':"AngularJS","description":"Javascript framework"},
      {'tag_id':1,'title':"Laravel","description":"PHP framework"},
      {'tag_id':1,'title':"NodeJS","description":"Javascript Server Side"},
    ],
    keyword:""
  },
  methods:{
    onOptionSelect(option) {

      let vm= this;
      this.selected_tags.push(option);
      // vm.$set(vm,keyword," ");
    },
    removetag:function(rmtag){
      console.log(rmtag);
      let vm = this;
      var selectedtags = this.selected_tags;
      selectedtags.map(function(tag,index,array){
        if(tag.title == rmtag.title){
           selectedtags.splice(index,1);
        }
      })
      vm.$set(vm,'selected_tags',selectedtags);
    }
  }
});
