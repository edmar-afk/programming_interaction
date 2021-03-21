angular.module('ngQuiz', ['ngSanitize'])

.controller('ngQuizController', function($scope, $timeout, quizProgress, scoreKeeper) {
  $scope.quizProgress = quizProgress;

  $scope.quizData = {
    "quizMetadata": {
      "title": "Coding Challenge",
      "intro": "Do you know the real scoop on the code? It’s time to find out!",
      "introImg": "img/intro.jpg",
      "introImgCredit": "Programming Learning Interaction"
    },
    "quizQuestions": [{
      "question": "Fill in the blanks to declare variable a of type int and then assign 7 as its value:",
      "questionImg": "img/q1.png",
      "feedback": "TIPS: It's always better to name your variable a word instead of just a letter.",
      "options": [{
        "name": "int, b",
        "correct": false
      }, {
        "name": "int, =",
        "correct": true
      }, {
        "name": "str, <",
        "correct": false
      }]
    }, {
      "question": "Select answer below.",
      "questionImg": "img/q2.png",
      "feedback": "cin represents the C-input.",
      "options": [{
        "name": "Print variable's value.",
        "correct": false
      }, {
        "name": "Take information(data) from the user.",
        "correct": true
      }, {
        "name": "Include a header file.",
        "correct": false
      }]
    }, {
      "question": "Type in the code that allows for entering a number and storing it in the variable a:",
      "questionImg": "img/q3.png",
      "feedback": "The cin is used to take input data from the user.",
      "options": [{
        "name": "cin",
        "correct": true
      }, {
        "name": "cout",
        "correct": false
      }, {
        "name": "Cin",
        "correct": false
      }]
    }, {
      "question": "Fill in the blanks to declare a variable var type int, enter a value, and store it in the variable var.",
      "questionImg": "img/q4.png",
      "feedback": "cout is followed by the insertion operator(<<), while cin(>>).",
      "options": [{
        "name": "Cout, Cin",
        "correct": false
      }, {
        "name": "cout, cin",
        "correct": true
      }, {
        "name": "cin, cout",
        "correct": false
      }]
    }, {
      "question": "Fill in the missing parts of the code to declare sum as  a variable, assign it the value 21 + 7, and print out its value.",
      "questionImg": "img/q5.png",
      "feedback": "",
      "options": [{
        "name": "sum, cout, sum",
        "correct": true
      }, {
        "name": "a, cin, b",
        "correct": false
      }, {
        "name": "sum, cout, sum",
        "correct": false
      }]
    }, 
    ]
  };

  $scope.quizQuestions = $scope.quizData.quizQuestions;
  $scope.quizMetadata = $scope.quizData.quizMetadata;
  quizProgress.lastQuestion = $scope.quizQuestions.length;
  quizProgress.loading = false;

  $scope.startQuiz = function() {
    quizProgress.inProgress = true;
    quizProgress.currentQuestion = 0;
    quizProgress.imageToPreload = 1;
  };

  $scope.nextQuestion = function() {
    if (quizProgress.currentQuestion < quizProgress.lastQuestion) {
      quizProgress.currentQuestion = quizProgress.currentQuestion + 1;
      quizProgress.currentQuestionFriendly = quizProgress.currentQuestionFriendly + 1;
      quizProgress.imageToPreload = quizProgress.imageToPreload + 1;
    }
  };

  $scope.answerQuestion = function(data) {
    $scope.quizQuestions[quizProgress.currentQuestion].answered = true;
    angular.forEach($scope.quizQuestions[quizProgress.currentQuestion].options, function(obj) {
      if (obj.name === data.selected) {
        obj.selected = true;
      } else {
        obj.selected = false;
      }
    });
  };

  $scope.checkAnswer = function() {
    $scope.quizQuestions[quizProgress.currentQuestion].answerChecked = true;

    angular.forEach($scope.quizQuestions[quizProgress.currentQuestion].options, function(obj) {
      if (obj.selected) {
        if (obj.correct) {
          $scope.quizQuestions[quizProgress.currentQuestion].answerWasRight = true;
        } else {
          $scope.quizQuestions[quizProgress.currentQuestion].answerWasRight = false;
        }
      }
    });
  };

  $scope.getScore = function() {
    quizProgress.inProgress = false;
    quizProgress.finished = true;
    quizProgress.calculatingScore = true;
    $scope.score = scoreKeeper.calculateScore($scope.quizQuestions);

    $timeout(function() {
      quizProgress.calculatingScore = false;
    }, 1500);
  };

  $scope.startOver = function() {
    angular.forEach($scope.quizQuestions, function(obj) {
      obj.answered = false;
      obj.answerWasRight = false;
      obj.answerChecked = false;

      angular.forEach(obj.options, function(option) {
        option.selected = false;
      });
    });

    quizProgress.inProgress = true;
    quizProgress.finished = false;
    quizProgress.currentQuestion = 0;
    quizProgress.currentQuestionFriendly = 1;
  };
})

.factory('quizProgress', function() {
  return {
    currentQuestion: 0,
    imageToPreload: 0,
    currentQuestionFriendly: 1,
    lastQuestion: 0,
    loading: true,
    inProgress: false,
    finished: false,
    calculatingScore: false
  };
})

.service('scoreKeeper', function() {
  this.calculateScore = function(quizQuestions) {
    var rightAnswers = 0;
    angular.forEach(quizQuestions, function(obj) {
      if (obj.answerWasRight) {
        rightAnswers += 1;
      }
    });

    return ((rightAnswers / quizQuestions.length) * 100).toFixed() + '%';
  };
})

.directive('progressBar', function(quizProgress) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      scope.$watch('quizProgress', function(newVal, oldVal) {
        if (newVal) {
          element.css('width', ((quizProgress.currentQuestionFriendly / quizProgress.lastQuestion) * 100 + '%'));
        }
      }, true);
    }
  };
})

.directive('imagePreload', function(quizProgress) {
  return {
    restrict: 'EA',
    template: "<img style='display:none;' ng-src='{{quizQuestions[quizProgress.imageToPreload].questionImg}}'/>"
  };
})

.directive('animateProgression', function(quizProgress, $timeout) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      scope.$watch('quizProgress.currentQuestion', function(newVal, oldVal) {
        if (newVal) {
          element.addClass('question-animate');
          $timeout(function() {
            element.removeClass('question-animate');
          }, 1500);
        }
      });
    }
  };
});