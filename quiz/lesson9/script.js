angular.module('ngQuiz', ['ngSanitize'])

.controller('ngQuizController', function($scope, $timeout, quizProgress, scoreKeeper) {
  $scope.quizProgress = quizProgress;

  $scope.quizData = {
    "quizMetadata": {
      "title": "Loop Quiz",
      "intro": "Do you know the real scoop on the Loop? It’s time to find out!",
      "introImg": "http://interactive.wttw.com/sites/default/files/styles/small-hero/public/B12_b.jpg",
      "introImgCredit": "Alan Brunettin"
    },
    "quizQuestions": [{
      "question": "The Chicago Loop got its name from:",
      "questionImg": "http://interactive.wttw.com/sites/default/files/styles/hero/public/Q1.jpg",
      "feedback": "Before the “L” came to the Loop, steam-powered cable cars circulated downtown, giving the area its name. Later, the elevated tracks and trains of the “L” made the Loop even more accessible to people throughout the Chicago region.",
      "options": [{
        "name": "The “L” tracks that circle the area.",
        "correct": false
      }, {
        "name": "Cable cars that circulated downtown before the “L” was built.",
        "correct": true
      }, {
        "name": "A turnaround circle for horse-drawn carriages.",
        "correct": false
      }]
    }, {
      "question": "What caused the Great Chicago Fire?",
      "questionImg": "http://interactive.wttw.com/sites/default/files/styles/hero/public/Q2.jpg",
      "feedback": "The fire did start in the vicinity of the O’Leary’s barn, but whether a cow kicked over a lantern, or a cinder came from a neighboring chimney, or a drunken neighbor dropped his pipe onto a pile of hay, or a meteor strike occurred (all theories that have been, ahem, hotly debated), no one knows for sure what happened in that barn, and the fire’s initial spark has never been definitively established.",
      "options": [{
        "name": "Mrs. O’Leary’s cow.",
        "correct": false
      }, {
        "name": "A meteor strike.",
        "correct": false
      }, {
        "name": "No one knows for sure.",
        "correct": true
      }]
    }, {
      "question": "What Chicago Loop building, now demolished, is considered the “first skyscraper”?",
      "questionImg": "http://interactive.wttw.com/sites/default/files/styles/hero/public/Q3.jpg",
      "feedback": "The nine-story Home Insurance Building, completed in 1885, was the first building fully framed with metal columns and beams, and so was considered to be the first skyscraper. It was demolished in 1931. Its architect, William LeBaron Jenney, is considered the father of the American skyscraper for his structural engineering innovations.",
      "options": [{
        "name": "The Home Insurance Building.",
        "correct": true
      }, {
        "name": "The Auditorium Building and Theater.",
        "correct": false
      }, {
        "name": "The Sears Tower.",
        "correct": false
      }]
    }, {
      "question": "Architectural preservationist Richard Nickel said, “Great architecture has only two natural enemies.” What are they, according to Nickel?",
      "questionImg": "http://interactive.wttw.com/sites/default/files/styles/hero/public/Q4.jpg",
      "feedback": "Richard Nickel was a young photography student at Illinois Institute of Technology when he first encountered Louis Sullivan’s work. He began documenting Sullivan buildings in photographs; later, he fought for their preservation.<br/><br/> When he couldn’t save the buildings, he salvaged ornament from them. Nickel lost his life in the old Chicago Stock Exchange Building  when it partially collapsed during its demolition in 1972.",
      "options": [{
        "name": "\"Time and pigeons\"",
        "correct": false
      }, {
        "name": "\"Water and stupid men\"",
        "correct": true
      }, {
        "name": "\"Earthquakes and fires\"",
        "correct": false
      }]
    }, {
      "question": "Louis Sullivan’s motto was:",
      "questionImg": "http://interactive.wttw.com/sites/default/files/styles/hero/public/Q5.jpg",
      "feedback": "Sullivan was famous for his idea that form follows function. His designs, such as for the Carson Pirie Scott department store (shown here), expressed the buildings’ purpose with an honesty and elegance that foreshadowed modern architecture.<br/><br/>He wrote: “What is the chief characteristic of the tall office building? It is lofty ... It must be tall, every inch of it tall ... a proud and soaring thing, rising in sheer exultation … without a single dissenting line.”",
      "options": [{
        "name": "\"Form follows function.\"",
        "correct": true
      }, {
        "name": "\"Less is more.\"",
        "correct": false
      }, {
        "name": "\"God is in the details.\"",
        "correct": false
      }]
    }, {
      "question": "Ludwig Mies van der Rohe said:",
      "questionImg": "http://interactive.wttw.com/sites/default/files/styles/hero/public/Q6_0.jpg",
      "feedback": "Mies’ aesthetic was influenced by his experience with Walter Gropius and the German Bauhaus, and by his desire to demonstrate that “less is more.” In Chicago, Mies’ most iconic project (shown here) is the Chicago Federal Center,  whose three buildings illustrate his stark, elegant modernism. The Federal Center also defied previous expectations of what civic structures should look like.<br/><br/>Like Louis Sullivan,  Mies believed that every element of a structure should work as part of a unified whole. In a 1958 interview, he said, “Architecture is a language … and if you are really good, you can be a poet.”",
      "options": [{
        "name": "\"Less is more.\"",
        "correct": true
      }, {
        "name": "\"Mind the gap.\"",
        "correct": false
      }, {
        "name": "\"Make every brick count.\"",
        "correct": false
      }]
    }, {
      "question": "Architect Bruce Graham once famously demonstrated how the Sears Tower (now Willis Tower) would be constructed using:",
      "questionImg": "http://interactive.wttw.com/sites/default/files/styles/hero/public/Q7.jpg",
      "feedback": "Architect Bruce Graham and structural engineer Fazlur Khan of Skidmore, Owings & Merrill employed an innovative construction approach — based on the concept of bundled tubes — to lend stability to the tall structure. Graham famously used a pack of cigarettes to demonstrate the concept to a peer.",
      "options": [{
        "name": "LEGO® blocks",
        "correct": false
      }, {
        "name": "A pack of cigarettes",
        "correct": true
      }, {
        "name": "A supercomputer",
        "correct": false
      }]
    }, {
      "question": "The “Chicago School” style of architecture includes a façade design that reflects:",
      "questionImg": "http://interactive.wttw.com/sites/default/files/styles/hero/public/Q8.jpg",
      "feedback": "The Marquette Building (shown here) serves as an example of the Chicago School style of architecture. It has a three-part façade that parallels a classical column — a clearly identified base, a vertical shaft of floors above, and an ornamented cornice that signifies the capital, or top, of the column.",
      "options": [{
        "name": "A political dynasty",
        "correct": false
      }, {
        "name": "A tree’s base, trunk and leaves",
        "correct": false
      }, {
        "name": "The three parts of a classical column",
        "correct": true
      }]
    }, {
      "question": "The “Chicago Window” is known for:",
      "questionImg": "http://interactive.wttw.com/sites/default/files/styles/hero/public/Q9.jpg",
      "feedback": "The Chicago window has a large, fixed central pane of glass, flanked by two operable narrow sashes. This window design became popular in the 1890s partly because it allowed for natural light and ventilation year round.",
      "options": [{
        "name": "A large fixed center pane",
        "correct": true
      }, {
        "name": "Louvered panels",
        "correct": false
      }, {
        "name": "Stained glass inserts",
        "correct": false
      }]
    }, {
      "question": "Before the advent of the steel frame skeleton, early skyscrapers were supported by:",
      "questionImg": "http://interactive.wttw.com/sites/default/files/styles/hero/public/Q10.jpg",
      "feedback": "In early tall buildings, such as the Monadnock building (shown here), the masonry was “load bearing.” That means the massive granite base of the Monadnock actually supported the full weight of the building’s 16-story walls. It was possibly the tallest skyscraper constructed in this manner, inspiring wonder at the time it was built.<br/><br/>Masonry construction as seen in the Monadnock had its limitations and problems, including extensive settling of the weight into Chicago’s clay soils. Later buildings benefited from the innovative use of steel-frame construction, which allowed for more height without the need for a hulking stone foundation at street level.",
      "options": [{
        "name": "Massive wooden piers",
        "correct": false
      }, {
        "name": "Load-bearing, exterior masonry walls",
        "correct": true
      }, {
        "name": "Neoclassical columns",
        "correct": false
      }]
    }]
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