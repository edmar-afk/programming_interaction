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
      "question": "Select in a code to declare a variable x, assign it to value 6 + 4, and print it to the screen.",
      "questionImg": "img/q1.png",
      "feedback": "",
      "options": [{
        "name": "x, cout, <<",
        "correct": true
      }, {
        "name": "int, cin, >>",
        "correct": false
      }, {
        "name": "x, Cout, >>",
        "correct": false
      }]
    }, {
      "question": "Select answer below to fill the missing parts in the following code to print 12.",
      "questionImg": "img/q2.png",
      "feedback": "cin represents the C-input.",
      "options": [{
        "name": "y, x",
        "correct": false
      }, {
        "name": "x, y",
        "correct": true
      }, {
        "name": "y, X",
        "correct": false
      }]
    }, {
      "question": "Select the answer below.",
      "questionImg": "img/q3.png",
      "feedback": "The basic arithmetic operators in C++ are precisely the same as in JavaScript, PHP, Java, Ruby and c#.",
      "options": [{
        "name": "+",
        "correct": false
      }, {
        "name": "-",
        "correct": false
      }, {
        "name": "*",
        "correct": true
      }]
    }, {
      "question": "Select the answer below to solve the declaration of variable x and assign it the value 81 divided by 3:",
      "questionImg": "img/q4.png",
      "feedback": "REMEMBER: C++ is a case-sensitive, so x and X are two different identifiers.",
      "options": [{
        "name": "y, +",
        "correct": false
      }, {
        "name": "x, /",
        "correct": true
      }, {
        "name": "X, /",
        "correct": false
      }]
    }, {
      "question": "Fill in the missing parts of the code to declare sum as  a variable, assign it the value 21 + 7, and print out its value.",
      "questionImg": "img/q5.png",
      "feedback": "",
      "options": [{
        "name": "/",
        "correct": false
      }, {
        "name": "-",
        "correct": false
      }, {
        "name": "%",
        "correct": true
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