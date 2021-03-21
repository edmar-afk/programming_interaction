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
      "question": "Select Answer Below:",
      "questionImg": "img/q1.png",
      "feedback": "c++ is a general purpose programming language which first appeared in 1983 i.e., almost 34 years ago and was designed by Bjarne Stroustrup.",
      "options": [{
        "name": "Client-side Scripting Language.",
        "correct": false
      }, {
        "name": "General Purpose Programming Language.",
        "correct": true
      }, {
        "name": "Movie making Program.",
        "correct": false
      }]
    }, {
      "question": "Answer the blank line of code to make a hello world program.",
      "questionImg": "img/q2.png",
      "feedback": "When you want to print something, you will write cout and <<. If you want to take some input you will need to write cin and >>.",
      "options": [{
        "name": "cin >>",
        "correct": false
      }, {
        "name": "cout >>",
        "correct": false
      }, {
        "name": "cout <<",
        "correct": true
      }]
    }, {
      "question": "Select answer below:",
      "questionImg": "img/q3.png",
      "feedback": "Semicolon is known as statement terminator in c++. It is used to terminate the statement in c++.",
      "options": [{
        "name": "semicolon(;)",
        "correct": true
      }, {
        "name": "comma(,)",
        "correct": false
      }, {
        "name": "colon(:)",
        "correct": false
      }]
    }, {
      "question": "Answer the blank line of code.",
      "questionImg": "img/q4.png",
      "feedback": "#include and then in between <> name of the header file in this case 'iostream'. Stands for input output stream definde cout cin etc. ",
      "options": [{
        "name": "#input <cout>",
        "correct": false
      }, {
        "name": "#include <iostream>",
        "correct": true
      }, {
        "name": "#cout <iostream>",
        "correct": false
      }]
    }, {
      "question": "Select answer below:",
      "questionImg": "img/q5.png",
      "feedback": "Namespace is a keyword which tells this class, function and methods we can use without write a name of class.",
      "options": [{
        "name": "std",
        "correct": true
      }, {
        "name": "standard",
        "correct": false
      }, {
        "name": "stdlib",
        "correct": false
      }]
    }, {
      "question": "Select answer below:",
      "questionImg": "img/q6.png",
      "feedback": "Remember endl is part of the std namespace, while /n isn't",
      "options": [{
        "name": "endl",
        "correct": true
      }, {
        "name": "#include",
        "correct": false
      }, {
        "name": "startl",
        "correct": false
      }]
    }, {
      "question": "Architect Bruce Graham once famously demonstrated how the Sears Tower (now Willis Tower) would be constructed using:",
      "questionImg": "img/q7.png",
      "feedback": "/n: to create new balls (newline) function the same as endl.",
      "options": [{
        "name": "/a",
        "correct": false
      }, {
        "name": "/n",
        "correct": true
      }, {
        "name": "/b",
        "correct": false
      }]
    }, {
      "question": "Select answer below:",
      "questionImg": "img/q8.png",
      "feedback": "At the statement level, comments should be used to describe WHY the code is doing something. A bad statement comment explains WHAT the coding is doing.",
      "options": [{
        "name": "##single line comment",
        "correct": false
      }, {
        "name": "**single line comment",
        "correct": false
      }, {
        "name": "//single line comment",
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